// import kolors from "@/constants/kolors";

// const baseUrl = "http://localhost:3000";
// export const apiEndpoint = `${baseUrl}/api/v1`;
export const apiEndpoint = `https://api-admin.bondyt.com`;

export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$^&*()_\-+={}[\]\\|"'`;<>,.?/]).{6,}$/;


export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Comprehensive email validation regex
  return emailRegex.test(email);
}



export function pauseExecution(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


type base64Interface = {
  display: boolean,
  status: boolean,
  message: string,
  result?: any,
}

export const convertToBase64 = (file: File): Promise<base64Interface> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    if (!file) resolve({
      display: false,
      status: false,
      message: ""
    });

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // resolve(fileReader.result);
      resolve({
        display: false,
        status: true,
        message: "",
        result: fileReader.result
      });
    }

    fileReader.onerror = (_error) => {
      resolve({
        display: true,
        status: false,
        message: "Error loading image."
      });
    }
  });
}


export const getQueryParams = (query: string) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const result = params.get(query);

  return result || '';
}





export function maskPhoneNumber(phoneNumber: string) {
  // Remove any non-digit characters from the input
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number has at least 4 digits
  if (cleanedNumber.length < 4) {
    return phoneNumber;
    // return 'Invalid phone number';
  }

  // Extract the last 4 digits
  const lastFourDigits = cleanedNumber.slice(-4);

  // Create a masked version with asterisks
  const maskedNumber = '*'.repeat(cleanedNumber.length - 4) + lastFourDigits;

  return maskedNumber;
}


export function maskEmailAddress(email: string) {
  // Split the email address into username and domain parts
  const [username, domain] = email.split('@');

  const lastThreeCharacters = username.slice(-3);
  const firstTwoCharacters = username.slice(0, 2);


  // Mask the username part
  const maskedUsername = firstTwoCharacters + '*'.repeat(username.length - 5) + lastThreeCharacters;

  // // Extract the last 3 characters before the @ symbol
  // const maskedDomain = domain.slice(0, domain.length - 3) + '*'.repeat(3);

  // Combine the masked parts to form the masked email
  const maskedEmail = `${maskedUsername}@${domain}`;

  return maskedEmail;
}


// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
  // Use a regular expression to match special characters and spaces
  const regex = /[^a-zA-Z0-9\s]/g;

  // Replace special characters with an empty string and spaces with hyphens
  const sanitizedString = text.replace(regex, "").replace(/\s+/g, "-");

  return sanitizedString;
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  // return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  const items = name.split(" ");

  let newName = '';
  for (let i = 0; i < items.length; i++) {
      newName = newName + items[i][0];
      if (i > 1) break;
  }
  return newName;
};

export function formatedNumber(number: number, locales = 'en-US', options = {}) {
  return new Intl.NumberFormat(locales, options).format(number);
}


export const currencyDisplay = (amount: number) => {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formattedAmount;
};

export function displayMessageCount(messageCount: number) {
  if (messageCount < 1000) {
    return formatedNumber(messageCount).toString(); // No suffix needed for less than 1000
  } else if (messageCount < 1000000) {
    return (messageCount / 1000).toFixed(2) + "K"; // Suffix K for thousands
  } else if (messageCount < 1000000000) {
    return (messageCount / 1000000).toFixed(2) + "M"; // Suffix M for millions
  } else {
    return (messageCount / 1000000000).toFixed(2) + "B"; // Suffix B for billions
  }
}

export function isNumeric(str: string) {
  // Use regular expression to check if the string contains only digits
  const regex = /^\d+$/;
  return regex.test(str);
}


export function generatePassword(length = 8) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  // const specialChars = "!@#$%^&*()_+{}[]<>?";
  // const specialChars = `~!@#$^&*()_-+={}[]\|"';:<>,.?/`;
  const specialChars = "~!@#$^&*()_-+={}[]\\|\"';:<>,.?/";


  

  if (length < 6) {
      throw new Error("Password length must be at least 6 characters.");
  }

  // Ensure each required character type is included
  let password = [
      uppercase[Math.floor(Math.random() * uppercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      digits[Math.floor(Math.random() * digits.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the rest of the password with random characters from all categories
  const allChars = uppercase + lowercase + digits + specialChars;
  for (let i = password.length; i < length; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the password to avoid predictable patterns
  password = password.sort(() => Math.random() - 0.5);

  // Join the array into a single string and return the result
  return password.join('');
}
