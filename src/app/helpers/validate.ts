import { HTMLAttributes } from "react";

export type RulesValidation = {
  min?: number;
  max?: number;
  required?: boolean;
  pattern?: RegExp;
};

export type ValidateProp = {
  field: string;
  value: string;
  rules: RulesValidation;
};

export type Fields = Pick<React.ChangeEvent<HTMLInputElement>, "currentTarget">;

export type Validate = {
  field: string;
  type: string;
  errors: Array<string>;
};

export const Validate = (
  name: string,
  value: string,
  rules: RulesValidation,
): boolean | Array<Validate> => {
  const errors: Array<Validate> = [];
  let rErrors: Array<Validate> = errors;
  if (rules.max) {
    if (value.length > rules.max) {
      errors.push({
        field: name,
        type: "maxLength",
        errors: ["A quantidadde de caractéres é superior ao esperado."],
      });
      rErrors = errors;
    } else {
      rErrors = errors.filter(
        (item) => item.field !== name && item.type !== "maxLength",
      );
    }
  }

  if (rules.min) {
    if (value.length < rules.min) {
      errors.push({
        field: name,
        type: "minLength",
        errors: ["A quantidadde de caractéres é superior ao esperado."],
      });
      rErrors = errors;
    } else {
      rErrors = errors.filter(
        (item) => item.field !== name && item.type !== "minLength",
      );
    }
  }

  if (rules.required) {
    if (!value.length) {
      errors.push({
        field: name,
        type: "required",
        errors: ["O campo é de preenchimento obrigatório."],
      });
      rErrors = errors;
    } else {
      rErrors = errors.filter(
        (item) => item.field !== name && item.type !== "required",
      );
    }
  }

  if (rules.pattern) {
    if (!value.length) {
      errors.push({
        field: name,
        type: "pattern",
        errors: ["O campo é de preenchimento obrigatório."],
      });
      rErrors = errors;
    } else {
      rErrors = errors.filter(
        (item) => item.field !== name && item.type !== "pattern",
      );
    }
  }
  if (!errors.length) {
    return false;
  }
  
  return rErrors;
};
