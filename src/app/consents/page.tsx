"use client";

import React, { useEffect, useState } from "react";
import { getToken } from "@/services/auth/authService";
import api from "@/api/apiConfig";

const CONSENT_VERSION = "1.0";
const CONSENT_TYPE = "image_similarity_detection";
const CONSENT_TEXT =
  "J'accepte que mes images soient analysées par un algorithme pour détecter les doublons et améliorer mon expérience.";

interface ConsentData {
    consent_text: string;
    consent_type: string;
    consent_version: string;
    created_at: string;
    id: number;
    is_granted: boolean;
    updated_at: string;
}

type ConsentState = "loading" | "not_given" | "granted" | "revoked" | "error" | "refused";

const ConsentsPage: React.FC = () => {
  const [state, setState] = useState<ConsentState>("loading");
  const [consent, setConsent] = useState<ConsentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setState("error");
      setError("Vous devez être connecté pour gérer vos consentements.");
      return;
    }
    setState("loading");
    api
      .get("/consents/active", {
        params: { type: CONSENT_TYPE },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        if (data.consent && data.consent.is_granted) {
          setConsent(data.consent);
          setState("granted");
        } else {
          setState("not_given");
        }
      })
      .catch((err) => {
        const msg = err?.response?.data || "";
        if (
          (err.response && err.response.status === 404) ||
          (typeof msg === "string" && msg.includes("aucun consentement actif trouvé"))
        ) {
          setState("not_given");
        } else {
          setState("error");
          setError("Impossible de vérifier le consentement.");
        }
      });
  }, [token]);

  // Accepter le consentement
  const handleAccept = async () => {
    if (!token) return;
    setState("loading");
    try {
      await api.post(
        "/consents",
        {
          consent_type: CONSENT_TYPE,
          consent_version: CONSENT_VERSION,
          is_granted: true,
          consent_text: CONSENT_TEXT,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setState("granted");
    } catch {
      setState("error");
      setError("Erreur lors de l'enregistrement du consentement.");
    }
  };

  // Révoquer le consentement
  const handleRevoke = async () => {
    if (!token || !consent) return;
    setState("loading");
    try {
      await api.post(
        `/consents/${consent.id}/revoke`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setState("revoked");
    } catch {
      setState("error");
      setError("Erreur lors de la révocation.");
    }
  };

  // Refuser (optionnel : stocker localement pour ne pas reposer la question)
  const handleRefuse = () => {
    setState("refused");
  };
console.log(consent)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">Consentement RGPD</h1>
        <p className="mb-2 text-center">{CONSENT_TEXT}</p>
        <p className="text-xs text-gray-500 mb-4 text-center">
          Version du consentement : v{CONSENT_VERSION}
        </p>
        {state === "loading" && <p>Chargement...</p>}
        {state === "refused" && (
  <div className="mt-4 text-center">
    <p className="text-orange-700 font-semibold">
      Vous avez refusé l’analyse algorithmique de vos images.<br />
      Cette fonctionnalité restera inaccessible tant que vous n’aurez pas donné votre consentement.
    </p>
    <button
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={handleAccept}
    >
      J’accepte finalement
    </button>
  </div>
)}
        {state === "error" && <p className="text-red-500">{error}</p>}
        {state === "not_given" && (
          <div className="flex gap-4 mt-4 justify-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleAccept}
            >
              J'accepte
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleRefuse}
            >
              Je refuse
            </button>
          </div>
        )}
        {state === "granted" && (
          <div className="mt-4 text-center">
            <p className="text-green-700 font-semibold">
x              Vous avez donné votre consentement le {consent?.updated_at ? new Date(consent.updated_at).toLocaleString() : ''}.
            </p>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleRevoke}
            >
              Révoquer mon consentement
            </button>
          </div>
        )}
        {state === "revoked" && (
          <div className="mt-4 text-center">
            <p className="text-orange-700 font-semibold">
              Consentement révoqué. Vous pouvez redonner votre consentement à tout moment.
            </p>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleAccept}
            >
              J'accepte à nouveau
            </button>
          </div>
        )}
        <div className="mt-6 text-xs text-gray-400 text-center">
          <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">
            Politique de confidentialité
          </a>
          <span className="mx-2">|</span>
          <a href="/mentions-legales" target="_blank" rel="noopener noreferrer">Mentions légales</a>
          <span className="mx-2">|</span>
          <a href="/CGU" target="_blank" rel="noopener noreferrer">CGU</a>
        </div>
      </div>
    </div>
  );
};

export default ConsentsPage; 