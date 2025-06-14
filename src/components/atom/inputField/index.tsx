import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    disabled?: boolean;
    note?: string;
    error?: string;
}

export default function InputField({
    label,
    placeholder = "",
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    autoComplete = "off",
    disabled = false,
    note
    = "",
    error = "",

}: InputFieldProps) {
    return (
        <div className="mb-4">
            {label && <label
                htmlFor={name}
                className="block mb-1 font-medium font-times text-[12pt]"
            >
                {label}
                <span className="text-[14px]">{note}</span>
            </label>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete={autoComplete}
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
