import type { CoinInfo } from '@midnight-ntwrk/ledger';
import { DAppConnectorAPI, DAppConnectorWalletAPI, ServiceUriConfig } from '@midnight-ntwrk/dapp-connector-api';
import { Transaction } from '@midnight-ntwrk/zswap';
import { pipe as fnPipe } from 'fp-ts/function';
import { type Logger } from 'pino';
import { catchError, concatMap, filter, firstValueFrom, interval, map, of, take, tap, throwError, timeout } from 'rxjs';
import semver from 'semver';
import { checkProofServerStatus } from '@/packages/midnight-core';

declare global {
  interface Window {
    midnight?: { [key: string]: DAppConnectorAPI };
  }
}

export class MidnightBrowserWallet {
  _walletInstance: DAppConnectorWalletAPI | undefined;
  _connectorAPI: DAppConnectorAPI | undefined;
  _walletName: string | undefined;
  _uris: ServiceUriConfig | undefined;
  _address: string | undefined;
  _coinPublicKey: string | undefined;
  _encryptionPublicKey: string | undefined;
  _proofServerOnline: boolean;

  private constructor(
    readonly logger: Logger,
    connectorAPI: DAppConnectorAPI,
    walletInstance: DAppConnectorWalletAPI,
    walletName: string,
    uris: ServiceUriConfig,
    address: string,
    coinPublicKey: string,
    encryptionPublicKey: string,
    proofServerOnline: boolean,
  ) {
    this._walletInstance = walletInstance;
    this._walletName = walletName;
    this._uris = uris;
    this._address = address;
    this._coinPublicKey = coinPublicKey;
    this._encryptionPublicKey = encryptionPublicKey;
    this._proofServerOnline = proofServerOnline;
  }

  static getAvailableWallets(): DAppConnectorAPI[] {
    if (window === undefined) return [];
    if (window.midnight === undefined) return [];

    const wallets: DAppConnectorAPI[] = [];
    for (const key in window.midnight) {
      try {
        const _wallet = window.midnight[key];
        if (_wallet === undefined) continue;
        if (_wallet.name === undefined) continue;
        if (_wallet.apiVersion === undefined) continue;
        wallets.push({
          name: _wallet.name,
          apiVersion: _wallet.apiVersion,
          enable: _wallet.enable,
          isEnabled: _wallet.isEnabled,
          serviceUriConfig: _wallet.serviceUriConfig,
        });
      } catch (e) {
        console.log(e);
      }
    }
    return wallets;
  }

  static getMidnightWalletConnected(): string | null {
    return window.localStorage.getItem('walletName-connected');
  }

  static setMidnightWalletConnected(walletName: string, logger?: Logger): void {
    if (logger) {
      logger.trace(`Setting wallet auto connect to ${walletName}`);
    }
    window.localStorage.setItem('walletName-connected', walletName);
  }

  static deleteMidnightWalletConnected(logger?: Logger): void {
    if (logger) {
      logger.trace('Deleting wallet auto connect ');
    }
    window.localStorage.removeItem('walletName-connected');
  }

  static async connectToWallet(walletName: string, logger: Logger): Promise<MidnightBrowserWallet> {
    const COMPATIBLE_CONNECTOR_API_VERSION = '1.x';

    return firstValueFrom(
      fnPipe(
        interval(100),
        map(() => window.midnight?.[walletName]),
        tap((connectorAPI) => {
          logger.info(connectorAPI, 'Check for wallet connector API');
        }),
        filter((connectorAPI): connectorAPI is DAppConnectorAPI => !!connectorAPI),
        concatMap((connectorAPI) =>
          semver.satisfies(connectorAPI.apiVersion, COMPATIBLE_CONNECTOR_API_VERSION)
            ? of(connectorAPI)
            : throwError(() => {
                logger.error(
                  {
                    expected: COMPATIBLE_CONNECTOR_API_VERSION,
                    actual: connectorAPI.apiVersion,
                  },
                  'Incompatible version of wallet connector API',
                );

                return new Error(
                  `Incompatible version of Midnight Lace wallet found. Require '${COMPATIBLE_CONNECTOR_API_VERSION}', got '${connectorAPI.apiVersion}'.`,
                );
              }),
        ),
        tap((connectorAPI) => {
          logger.info(connectorAPI, 'Compatible wallet connector API found. Connecting.');
        }),
        take(1),
        timeout({
          first: 1_000,
          with: () =>
            throwError(() => {
              logger.error('Could not find wallet connector API');

              return new Error('Could not find Midnight Lace wallet. Extension installed?');
            }),
        }),
        concatMap(async (connectorAPI) => {
          const isEnabled = await connectorAPI.isEnabled();

          logger.info(isEnabled, 'Wallet connector API enabled status');

          return connectorAPI;
        }),
        timeout({
          first: 5_000,
          with: () =>
            throwError(() => {
              logger.error('Wallet connector API has failed to respond');

              return new Error('Midnight Lace wallet has failed to respond. Extension enabled?');
            }),
        }),
        concatMap(async (connectorAPI) => ({
          walletConnectorAPI: await connectorAPI.enable(),
          connectorAPI,
        })),
        catchError((error, apis) =>
          error
            ? throwError(() => {
                logger.error('Unable to enable connector API');
                return new Error('Application is not authorized');
              })
            : apis,
        ),
        concatMap(async ({ walletConnectorAPI, connectorAPI }) => {
          const uris = await connectorAPI.serviceUriConfig();
          const { address, coinPublicKey, encryptionPublicKey } = await walletConnectorAPI.state();
          const proofServerOnline = await checkProofServerStatus(uris.proverServerUri);

          logger.info('Connected to wallet connector API and retrieved service configuration');

          const wallet = new MidnightBrowserWallet(
            logger,
            connectorAPI,
            walletConnectorAPI,
            walletName,
            uris,
            address,
            coinPublicKey,
            encryptionPublicKey,
            proofServerOnline,
          );

          // Call the static method
          MidnightBrowserWallet.setMidnightWalletConnected(walletName, logger);

          return wallet;
        }),
      ),
    );
  }

  disconnect(logger?: Logger): void {
    MidnightBrowserWallet.deleteMidnightWalletConnected(logger);
    this._walletInstance = undefined;
    this._connectorAPI = undefined;
    this._walletName = undefined;
    this._uris = undefined;
    this._address = undefined;
    this._coinPublicKey = undefined;
    this._encryptionPublicKey = undefined;
    this._proofServerOnline = false;
  }

  async balanceAndProveTransaction(tx: Transaction, newCoins: CoinInfo[]): Promise<Transaction> {
    if (this._walletInstance) {
      const balancedAndProvedTransaction = await this._walletInstance.balanceAndProveTransaction(tx, newCoins);
      return balancedAndProvedTransaction;
    } else {
      return Promise.reject(new Error('readonly'));
    }
  }

  async submitTransaction(tx: Transaction): Promise<string> {
    if (this._walletInstance) {
      const submitTransaction = await this._walletInstance.submitTransaction(tx);
      return submitTransaction;
    } else {
      return Promise.reject(new Error('readonly'));
    }
  }
}
