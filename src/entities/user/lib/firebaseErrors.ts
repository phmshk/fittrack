import { t } from "i18next";

/**
 * Converts Firebase authentication error codes to user-friendly, localized messages.
 * @param error - The Firebase error object.
 * @returns - A localized string with the error message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFirebaseAuthErrorMessage = (error: any): string => {
  if (!error || !error.code) {
    return t("common:notifications.registrationError"); // General error
  }

  switch (error.code) {
    case "auth/invalid-email":
      return t("forms:errors.invalidEmail");
    case "auth/email-already-in-use":
      return t("common:notifications.emailAlreadyInUse");
    case "auth/password-does-not-meet-requirements":
      return t("forms:errors.passwordRequirements");
    case "auth/weak-password":
      return t("forms:errors.passwordMin");
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return t("common:notifications.loginError");
    default:
      console.error("Unhandled Firebase Auth Error:", error);
      return t("common:notifications.registrationError");
  }
};
