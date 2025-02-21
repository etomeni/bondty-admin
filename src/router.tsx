import { createBrowserRouter, Navigate } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop.tsx";
import NotFoundPage from '@/pages/NotFound.tsx';

import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import Login from '@/pages/auth/Login.tsx';
import ForgotPassword from "@/pages/auth/ForgotPassword.tsx";
import VerifyEmail from "@/pages/auth/VerifyEmail.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";

import AccountLayout from "./pages/account/AccountLayout";
import Dashboard from "./pages/sunday/Dashboard";
import UsersPage from "./pages/sunday/users/Users";
import UserDetailsPage from "./pages/sunday/users/UserDetails";
import UserDytTokenTransactionsPage from "./pages/sunday/users/UserDytTokenTransactions";
import UserStickerTransactionsPage from "./pages/sunday/users/UserStickerTransactions";
import NotificationPage from "./pages/sunday/NotificationPage";
import UserTransactionHistoryPage from "./pages/sunday/users/UserTransactionHistory";
import UserDetailsEditProfilePage from "./pages/sunday/users/UserDetailsEdit";
import ProductsPage from "./pages/sunday/products/Products";
import AdManagerPage from "./pages/sunday/AdManager/AdManager";
import AdReviewDetailsPage from "./pages/sunday/AdManager/AdReviewDetails";
import LiveAdDetailsPage from "./pages/sunday/AdManager/LiveAdDetails";
import NewEditAdDetailsPage from "./pages/sunday/AdManager/NewEditAdDetails";
import MarketingPage from "./pages/sunday/marketing/Marketing";
// import StorePage from "./pages/sunday/store/Store";
import PendingApprovalPage from "./pages/sunday/merchant/PendingApproval";
import PendingMerchantDeatilsPage from "./pages/sunday/merchant/PendingMerchantDeatils";
import AvailableMerchantsPage from "./pages/sunday/merchant/AvailableMerchants";
import MerchantStoreDetailsPage from "./pages/sunday/merchant/store/MerchantStoreDetails";
import LocationRequestPage from "./pages/sunday/merchant/location/LocationRequest";
import MerchantLocationDetailsPage from "./pages/sunday/merchant/location/MerchantLocationDetails";
import MerchantEventsDetailsPage from "./pages/sunday/merchant/events/MerchantEventsDetails";
import EventsRequestPage from "./pages/sunday/merchant/events/EventsRequest";
import MerchantSecurityDetailsPage from "./pages/sunday/merchant/security/MerchantSecurityDetails";
import BooksRequestPage from "./pages/sunday/merchant/books/BooksRequest";
import MerchantBooksDetailsPage from "./pages/sunday/merchant/books/MerchantBooksDetails";
import PushNotificationAddEditPage from "./pages/sunday/marketing/PushNotificationAddEdit";
import PaymentsPage from "./pages/sunday/payment/Payments";
import StoreOrdersPage from "./pages/sunday/merchant/store/StoreOrders";

import {
  Library,
  Places,
  Bonded,
  Cars,
  Dates,
  Store,
  CompletedOrders,
  DeclinedOrders,
  PendingOrders,
  PendingDates,
  Subscriptions,
  DeclinedDates,
  BookedDates,
  BookedDetails


} from "@/pages/Isaac/ComponentsImports";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <Navigate replace to={"/auth/login"} />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />
            },
            {
              path: "verify-email",
              element: <VerifyEmail />
            },
            {
              path: "create-new-password",
              element: <CreateNewPassword />
            },
          ]
        },


        {
          path: "admin",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />
            },
            {
              path: "notifications",
              element: <NotificationPage />
            },

            {
              path: "users",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <UsersPage />
                },
                {
                  path: ":id",
                  element: <UserDetailsPage />
                },
                {
                  path: ":id/edit",
                  element: <UserDetailsEditProfilePage />
                },
                {
                  path: ":id/dyt-token-transactions",
                  element: <UserDytTokenTransactionsPage />
                },
                {
                  path: ":id/sticker-transactions",
                  element: <UserStickerTransactionsPage />
                },
                {
                  path: ":id/transaction-history",
                  element: <UserTransactionHistoryPage />
                },
              ]
            },

            {
              path: "products",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <ProductsPage />
                },
              ]
            },

            {
              path: "ad-manager",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <AdManagerPage />
                },
                {
                  path: "review-details",
                  element: <AdReviewDetailsPage />
                },
                {
                  path: "live-details",
                  element: <LiveAdDetailsPage />
                },
                {
                  path: "edit/:id",
                  element: <NewEditAdDetailsPage />
                },
                {
                  path: "new",
                  element: <NewEditAdDetailsPage />
                },
              ]
            },

            {
              path: "marketing",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <MarketingPage />
                },
                {
                  path: "push-notification-add-edit",
                  element: <PushNotificationAddEditPage />
                },
              ]
            },
            // {
            //   path: "store",
            //   // element: <AccountLayout />,
            //   children: [
            //     {
            //       path: "",
            //       element: <StorePage />
            //     },
            //   ]
            // },
            {
              path: "merchant",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <PendingApprovalPage />
                },
                {
                  path: "pending-merchant-deatils",
                  element: <PendingMerchantDeatilsPage />
                },
                {
                  path: "available-merchants",
                  element: <AvailableMerchantsPage />
                },
                {
                  path: "merchant-store",
                  element: <MerchantStoreDetailsPage />
                },
                {
                  path: "store-orders/:orderCategory",
                  element: <StoreOrdersPage />
                },

                {
                  path: "location-request",
                  element: <LocationRequestPage />
                },

                {
                  path: "merchant-location-details",
                  element: <MerchantLocationDetailsPage />
                },

                {
                  path: "events-request",
                  element: <EventsRequestPage />
                },

                {
                  path: "merchant-events-details",
                  element: <MerchantEventsDetailsPage />
                },

                {
                  path: "merchant-security-details",
                  element: <MerchantSecurityDetailsPage />
                },

                {
                  path: "books-request",
                  element: <BooksRequestPage />
                },

                {
                  path: "merchant-books-details",
                  element: <MerchantBooksDetailsPage />
                },
              ]
            },
            {
              path: "payment",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <PaymentsPage />
                },
              ]
            },

            
            {
              path: "library",
              element: <Library />,
            },
            {
              path: "places",
              element: <Places />,
            },
            {
              path: "bonded",
              element: <Bonded />,
            },
            {
              path: "dates/cars",
              element: <Cars />,
            },
            {
              path: "dates",
              element: <Dates />,
            },
            {
              path: "dates/:id",
              element: <PendingDates />,
            },
            {
              path: "store",
              element: <Store />,
            },
            {
              path: "completed-orders",
              element: <CompletedOrders />,
            },
            {
              path: "declined-orders",
              element: <DeclinedOrders />,
            },
            {
              path: "pending-orders",
              element: <PendingOrders />,
            },
            {
              path: "subscriptions",
              element: <Subscriptions />,
            },
            {
              path: "dates/declined-dates",
              element: <DeclinedDates />,
            },
            {
              path: "dates/booked-dates",
              element: <BookedDates />,
            },
            {
              path: "dates/booked-dates/:id",
              element: <BookedDetails />,
            },
            
            
          ]
        }

      ]
    },

    {
      path: "*",
      element: <NotFoundPage />
    }
]);