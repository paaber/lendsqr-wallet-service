// @constants/Paths.ts
export default {
  Base: '/api',
  Version1: '/v1',
  Users: {
    Base: '/users',
    Register: '/register',
    Login: '/login',
    Profile: '/profile/:userId',
    CheckBlacklist: '/check-blacklist',
  },
  Wallets: {
    Base: '/wallets',
    FundAccount: '/fund',
    TransferFunds: '/transfer',
    WithdrawFunds: '/withdraw',
    GetBalance: '/balance/:userId',
  },
} as const;
