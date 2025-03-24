export type ProviderCallbackAction =
  | "downloadProverStarted"
  | "downloadProverDone"
  | "proveTxStarted"
  | "proveTxDone"
  | "balanceTxStarted"
  | "balanceTxDone"
  | "submitTxStarted"
  | "submitTxDone"
  | "watchForTxDataStarted"
  | "watchForTxDataDone";