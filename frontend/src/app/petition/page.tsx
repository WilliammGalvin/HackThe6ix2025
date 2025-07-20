"use client";
import React, { useState } from "react";

const PetitionPage: React.FC = () => {
    const [name, setName] = useState("");
    const [signed, setSigned] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setSigned(true);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Petition Page</h1>
            <p className="mb-6 text-gray-700">Welcome to the petition page.</p>

            {!signed ? (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Enter your name to sign the petition:
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Petition
                    </button>
                </form>
            ) : (
                <p className="text-green-700 text-lg font-semibold">
                    Thank you, {name}, for signing the petition!
                </p>
            )}
        </main>
    );
};

export default PetitionPage;
