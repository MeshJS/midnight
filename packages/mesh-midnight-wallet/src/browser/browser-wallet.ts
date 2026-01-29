import { InitialAPI, ConnectedAPI, Configuration } from "@midnight-ntwrk/dapp-connector-api";
import { pipe as fnPipe } from 'fp-ts/lib/function.js';
import { type Logger } from 'pino';
import { catchError, concatMap, filter, firstValueFrom, interval, map, take, tap, throwError, timeout } from 'rxjs';
import { checkProofServerStatus } from '@meshsdk/midnight-core';

declare global {
  interface Window {
    midnight?: { [key: string]: InitialAPI };
  }
}

export class MidnightBrowserWallet {
  _walletInstance: ConnectedAPI | undefined;
  _connectorAPI: InitialAPI | undefined;
  _walletName: string | undefined;
  _uris: Configuration | undefined;
  _address: string | undefined;
  _coinPublicKey: string | undefined;
  _encryptionPublicKey: string | undefined;
  _proofServerOnline: boolean;

  private constructor(
    _connectorAPI: InitialAPI,
    walletInstance: ConnectedAPI,
    walletName: string,
    uris: Configuration,
    address: string,
    coinPublicKey: string,
    encryptionPublicKey: string,
    proofServerOnline: boolean,
    readonly logger?: Logger,
  ) {
    this._walletInstance = walletInstance;
    this._walletName = walletName;
    this._uris = uris;
    this._address = address;
    this._coinPublicKey = coinPublicKey;
    this._encryptionPublicKey = encryptionPublicKey;
    this._proofServerOnline = proofServerOnline;
    this.logger = logger;
  }

  static getAvailableWallets(): InitialAPI[] {
    if (window === undefined) return [];
    if (window.midnight === undefined) return [];

    const wallets: InitialAPI[] = [];
    for (const key in window.midnight) {
      try {
        const _wallet = window.midnight[key];
        if (_wallet === undefined) continue;
        if (_wallet.name === undefined) continue;
        if (_wallet.apiVersion === undefined) continue;
        wallets.push(_wallet);
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

  static async connectToWallet(walletName: string, logger?: Logger): Promise<MidnightBrowserWallet> {    

    return firstValueFrom(
      fnPipe(
        interval(100),
        map(() => window.midnight?.[walletName]),
        tap((connectorAPI) => {
          logger?.info(connectorAPI, 'Check for wallet connector API');
        }),
        filter((connectorAPI) => !!connectorAPI),      
        tap((connectorAPI) => {
          logger?.info(connectorAPI, 'Compatible wallet connector API found. Connecting.');
        }),
        take(1),
        timeout({
          first: 1_000,
          with: () =>
            throwError(() => {
              logger?.error('Could not find wallet connector API');

              return new Error('Could not find Midnight Lace wallet. Extension installed?');
            }),
        }),
        timeout({
          first: 5_000,
          with: () =>
            throwError(() => {
              logger?.error('Wallet connector API has failed to respond');

              return new Error('Midnight Lace wallet has failed to respond. Extension enabled?');
            }),
        }),
        concatMap(async (connectorAPI) => ({
          walletConnectorAPI: await connectorAPI.connect("preview"),
          connectorAPI
        })),
        catchError((error, apis) =>
          error
            ? throwError(() => {
                logger?.error('Unable to enable connector API');
                return new Error('Application is not authorized');
              })
            : apis,
        ),
        concatMap(async ({ walletConnectorAPI, connectorAPI }) => {
          const uris = await walletConnectorAPI.getConfiguration();
          const { shieldedAddress, shieldedCoinPublicKey, shieldedEncryptionPublicKey } = await walletConnectorAPI.getShieldedAddresses();
          const proofServerOnline = await checkProofServerStatus(uris.proverServerUri);

          logger?.info('Connected to wallet connector API and retrieved service configuration');

          const wallet = new MidnightBrowserWallet(
            connectorAPI,
            walletConnectorAPI,
            walletName,
            uris,
            shieldedAddress,
            shieldedCoinPublicKey,
            shieldedEncryptionPublicKey,
            proofServerOnline,
            logger,
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

  async balanceAndProveTransaction(tx: string): Promise<string> {
    if (this._walletInstance) {
      const { tx: balancedTx } = await this._walletInstance.balanceUnsealedTransaction(tx);
      return balancedTx;
    } else {
      return Promise.reject(new Error('readonly'));
    }
  }

  async submitTransaction(tx: string): Promise<void> {
    if (this._walletInstance) {
      await this._walletInstance.submitTransaction(tx);
    } else {
      return Promise.reject(new Error('readonly'));
    }
  }
}