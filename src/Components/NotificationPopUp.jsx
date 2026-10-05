"use client"
import { useState } from 'react'
import { useEffect } from 'react';

export default function NotificationPopUp() {
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1500);
        return () => clearTimeout(timer)
    }, [])

    const handleSubscribe = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification("Welcome to TechCart!", {
                body: "You will now receive updates about your orders and offers.",
            })
        }
        console.log("NOTIFICATION PERMISSION:", permission)

        setShowPopup(false)

    }

    if (!showPopup) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:bottom-6 sm:right-6 sm:p-6">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg text-white">
                    🔔
                </div>

                <div className="min-w-0">
                    <h2 className="text-base font-semibold text-gray-900">
                        Would you like to receive Push Notifications?
                    </h2>

                    <p className="mt-2 text-sm leading-5 text-gray-600">
                        We promise to only send you relevant content and give you
                        updates on your transactions.
                    </p>
                </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                    No thanks
                </button>

                <button
                    type="button"
                    onClick={handleSubscribe}
                    className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Sign me up!
                </button>
            </div>
        </div>

    )
}