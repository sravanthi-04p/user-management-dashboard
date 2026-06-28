import {DEFAULT_DEPARTMENT} from './constants.js'

/**
 * Split a full name string into firstName and lastName.
 * Example: "Leanne Graham" → { firstName: "Leanne", lastName: "Graham" }
 */
export const splitName=(fullName="")=>{
    const parts=fullName.trim().split(" ");
    return {
        firstName:parts[0] || "",
        lastName:parts.slice(1).join(" ") || "",
    };
};

/**
 * Map a raw JSONPlaceholder user object into our app's flat shape.
 * Uses DEFAULT_DEPARTMENT since the API provides no department field.
 */
export const mapApiUser=(apiUser)=>{
    const {firstName,lastName}=splitName(apiUser.name)
    return{
        id:apiUser.id,
        firstName,
        lastName,
        email:apiUser.email,
        department:DEFAULT_DEPARTMENT
    };
};

/**
 * Generate a unique temp ID for locally added users.
 * JSONPlaceholder always returns id:11 on POST — this avoids key collisions.
 */
export const generateNextId = (users) => {
  if (users.length === 0) return 1;
  return Math.max(...users.map((u) => u.id)) + 1;
};