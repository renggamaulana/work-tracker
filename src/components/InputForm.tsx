'use client';

import React, { InputHTMLAttributes } from 'react';

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  className?: string;
}

export default function InputForm({
  id,
  type = 'text',
  name,
  placeholder,
  className = '',
  ...props
}: InputFormProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`text-white bg-white/5 p-3 rounded-lg w-full ${className}`}
        {...props}
      />
    </div>
  );
}
