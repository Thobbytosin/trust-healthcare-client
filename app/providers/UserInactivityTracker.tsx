"use client";
import Modal from "@/components/ui/Modal";
import { SERVER_URI } from "@/config/api";
import { CLEARACCESSTOKEN } from "@/config/auth.endpoints";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import { getCookie } from "@/utils/helpers";
import React, { useCallback, useState } from "react";

type Props = {};

const UserInactivityTracker = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const hasBeenAuthenticated =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.cookie.includes("cookie_consent") &&
    document.cookie.includes("has_logged_in");
  const [loading, setLoading] = useState(false);
  const consent = getCookie("cookie_consent");

  const handleInactivity = useCallback(async () => {
    if (!hasBeenAuthenticated) return;

    try {
      const res = await fetch(`${SERVER_URI}${CLEARACCESSTOKEN}`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-cookie-consent": consent || "",
        },
      });

      if (res.ok) {
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
    // if (data) {
    //   console.log("TIMEOUT");
    //   setShowModal(true);
    // }
  }, [hasBeenAuthenticated]);

  useInactivityTimer({
    enabled: hasBeenAuthenticated,
    onTimeout: handleInactivity,
    timeout: 35 * 60 * 1000, // in minutes
  });

  const handleTryAgain = () => {
    setShowModal(false);
    window.location.reload();
  };
  return (
    <>
      {showModal && (
        <Modal
          mode="user-inactivity"
          setOpenModal={setShowModal}
          setMode={() => "null"}
          auth={false}
          handlePress={handleTryAgain}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default UserInactivityTracker;
