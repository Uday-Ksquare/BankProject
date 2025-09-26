import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/Dashboard.jsx";
import SupplementsL1 from "./components/SupplementsL1.jsx";
import SupplementsL2 from "./components/SupplementsL2.jsx";
import DocumentUploaderpage from "./pages/DocumentuploaderPage.jsx";
import CdsLstPage from "./pages/CdsLstPage.jsx";
import DdaLstPage from "./pages/DdaLstPage.jsx";
import FinDepPage from "./pages/FinDepPage.jsx";
import FinLnsPage from "./pages/FinLnsPage.jsx";
import InvLstPage from "./pages/InvLstPage.jsx";
import SavLstPage from "./pages/SavLstPage.jsx";
import Example from "./pages/Nested.jsx";
import SupplimentDepositPage from "./pages/SupplimentDepositPage.jsx";
import PrMapPage from "./pages/PrMapPage.jsx";
import SuppGLoansPage from "./pages/SuppGLoansPage.jsx";
import BankChequesAndDrafts from "./pages/BankChequesAndDrafts.jsx";
import DueToDueForm from "./pages/DueToDueForm.jsx";
import SuppDBorrowings from "./pages/SuppDBorrowings.jsx";
import FinancialDerivativesPage from "./pages/FinancialDerivativesPage.jsx";
import TradeCreditAndAdvancePage from "./pages/TradeCreditAndAdvancePage.jsx";
import InvestmentAndDebenture from "./pages/InvestmentAndDebenture.jsx";
import SettlementAccountsPage from "./pages/SettlementAccountsPage.jsx";
import PayablesAndReceivablesPage from "./pages/PayablesAndReceivablesPage.jsx";
import DueToBankspage from "./pages/DueToBankspage.jsx";
import DueFromBanksPage from "./pages/DueFromBanksPage.jsx";
import InterestRatesPage from "./pages/InterestRatesPage.jsx";
import CurrencyPositionPage from "./pages/CurrencyPositionPage.jsx";
import PROneImportPage from "./pages/PROneImportPage.jsx";
import SettlementsAccountsTwoPage from "./pages/SettlementsAccountsTwoPage.jsx";
import InvestmentAndDebunturetwoPage from "./pages/InvestmentAndDebunturetwoPage.jsx";
import TradeCreditAndAdvanceTwoPage from "./pages/TradeCreditAndAdvanceTwoPage.jsx";
import FinancialDerivativesTwoPage from "./pages/FinancialDerivativesTwoPage.jsx";
import OverDraftPage from "./pages/OverDraftPage.jsx";
import AccruedPage from "./pages/AccruedPage.jsx";
import DueToDueFormOtherECCU from "./pages/DueToDueFormOtherECCU.jsx";
import DueToDueFormOtherNonCaricomPage from "./pages/DueToDueFormOtherNonCaricomPage.jsx";
import DueToDueFormOtherNonEccuPage from "./pages/DueToDueFormOtherNonEccuPage.jsx";
import SupplimentAOneDepositsPage from "./pages/SupplimentAOneDepositsPage.jsx";
import SuppGLoansForeignCurrencyPage from "./pages/SuppGLoansForeignCurrencyPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/scr_cdslst",
            element: <CdsLstPage />,
          },
          {
            path: "/scr_ddalst",
            element: <DdaLstPage />,
          },
          {
            path: "/upload",
            element: <DocumentUploaderpage />,
          },
          {
            path: "/scr_findep",
            element: <FinDepPage />,
          },
          {
            path: "/scr_finlns",
            element: <FinLnsPage />,
          },
          {
            path: "/scr_invlst",
            element: <InvLstPage />,
          },
          {
            path: "/scr_savlst",
            element: <SavLstPage />,
          },
          {
            path: "/scr_worksheet",
            element: <Example />,
          },
          {
            path: "/scr_supp_a_deposits",
            element: <SupplimentDepositPage />,
          },
          {
            path: "/scr_pr01_map",
            element: <PrMapPage />,
          },
          {
            path: "/scr_supp_g_loans",
            element: <SuppGLoansPage />,
          },
          {
            path: "/scr_supp_b_bank_cheques_and_drafts",
            element: <BankChequesAndDrafts />,
          },
          {
            path: "/scr_supp_c_due_to_and_due_from",
            element: <DueToDueForm />,
          },
          {
            path:"/scr_supp_c_due_to_and_due_from_other_non_caricom",
            element:<DueToDueFormOtherNonCaricomPage/>
          },
          {
            path:"/scr_supp_c_due_to_and_due_from_other_non_eccu",
            element:<DueToDueFormOtherNonEccuPage/>
          },
          {
            path: "/scr_supp_c_due_to_and_due_from_other_eccu",
            element: <DueToDueFormOtherECCU />,
          },
          {
            path: "/scr_supp_d_borrowings",
            element: <SuppDBorrowings />,
          },
          {
            path: "/scr_supp_e_financial_derivatives",
            element: <FinancialDerivativesPage />,
          },
          {
            path: "/scr_supp_e2_financial_derivatives",
            element: <FinancialDerivativesTwoPage />,
          },
          {
            path: "/scr_supp_f_trade_credit_and_advance",
            element: <TradeCreditAndAdvancePage />,
          },
          {
            path: "/scr_supp_f2_trade_credit_and_advance",
            element: <TradeCreditAndAdvanceTwoPage />,
          },
          {
            path: "/scr_supp_h_investment_and_debenture",
            element: <InvestmentAndDebenture />,
          },
          {
            path: "/scr_supp_h2_investment_and_debenture",
            element: <InvestmentAndDebunturetwoPage />,
          },
          {
            path: "/scr_supp_i_settlement_accounts ",
            element: <SettlementAccountsPage />,
          },
          {
            path: "/scr_supp_i2_settlement_accounts ",
            element: <SettlementsAccountsTwoPage />,
          },
          {
            path: "/scr_supp_j_payables_and_receivables",
            element: <PayablesAndReceivablesPage />,
          },
          {
            path: "/scr_supp_K1_due_to_banks",
            element: <DueToBankspage />,
          },
          {
            path: "/scr_supp_K2_due_from_banks",
            element: <DueFromBanksPage />,
          },
          {
            path: "/scr_supp_l_interest_rates",
            element: <InterestRatesPage />,
          },
          {
            path: "/scr_supp_m_currency_positions",
            element: <CurrencyPositionPage />,
          },
          {
            path: "scr_pr01import",
            element: <PROneImportPage />,
          },
          {
            path: "/scr_overdraft",
            element: <OverDraftPage />,
          },
          {
            path: "/scr_accrued_interest",
            element: <AccruedPage />,
          },
          {
            path:"/scr_supp_a1_deposits",
            element:<SupplimentAOneDepositsPage/>
          },
          {
            path:"/scr_supp_g_loans_foreign_currency",
            element:<SuppGLoansForeignCurrencyPage/>
          }
        ],
      },

      // {
      //   path: "/orders",
      //   element: <div>Orders</div>,
      // },
    ], // root layout route
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
