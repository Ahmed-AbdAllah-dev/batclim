"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "./utils";
import { Label } from "./label";

// Simple Form components without react-hook-form dependencies
// These are just UI components that will work with any form library

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    />
  );
});
Form.displayName = "Form";

// Form Field Context
type FormFieldContextValue = {
  name: string;
  error?: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a FormField");
  }
  return context;
}

// Form Field Component
const FormField = ({
  name,
  error,
  children,
}: {
  name: string;
  error?: string;
  children: React.ReactNode;
}) => {
  return (
    <FormFieldContext.Provider value={{ name, error }}>
      {children}
    </FormFieldContext.Provider>
  );
};

// Form Item Context
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormItem() {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error("useFormItem must be used within a FormItem");
  }
  return context;
}

// Form Item Component
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// Form Label Component - Using your Label component
const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const formField = useFormField();
  const formItem = useFormItem();
  const hasError = !!formField.error;

  return (
    <Label
      ref={ref}
      className={cn(hasError && "text-destructive", className)}
      htmlFor={formItem.id}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

// Form Control Component
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const formField = useFormField();
  const formItem = useFormItem();

  return (
    <Slot
      ref={ref}
      id={formItem.id}
      aria-invalid={!!formField.error}
      aria-describedby={formField.error ? `${formItem.id}-error` : undefined}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// Form Description Component
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const formItem = useFormItem();

  return (
    <p
      ref={ref}
      id={`${formItem.id}-description`}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

// Form Message Component
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const formField = useFormField();
  const formItem = useFormItem();

  if (!formField.error && !children) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={`${formItem.id}-error`}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {formField.error || children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};