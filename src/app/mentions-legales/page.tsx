"use client";

import React from "react";

const MentionsLegalesPage: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
    <h1 className="text-3xl font-bold mb-6 text-center">Mentions légales</h1>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Éditeur du site</h2>
    <p className="mb-4">
      <strong>Bing Photo SAS</strong><br />
      123, rue de la Photo, 13004 Marseille, France<br />
      Email : contact@bingphoto.fr<br />
      SIRET : 123 456 789 00012
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. Hébergement</h2>
    <p className="mb-4">
      <strong>OVH SAS</strong><br />
      2 rue Kellermann, 59100 Roubaix, France<br />
      www.ovh.com
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Propriété intellectuelle</h2>
    <p className="mb-4">
      L'ensemble des éléments du site et de l'application (textes, images, logos, marques, logiciels, etc.) sont protégés par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation expresse, est interdite.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Données personnelles</h2>
    <p className="mb-4">
      Les données personnelles collectées sont traitées conformément à la <a href="/politique-confidentialite" className="underline text-blue-600">politique de confidentialité</a> et au RGPD. L'utilisateur dispose d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de ses données.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
    <p className="mb-4">
      L'application utilise des cookies strictement nécessaires à son fonctionnement. Tout cookie non essentiel est soumis au consentement de l'utilisateur.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Sécurité</h2>
    <p className="mb-4">
      Bing Photo met en œuvre toutes les mesures nécessaires pour assurer la sécurité et la confidentialité des données. L'utilisateur s'engage à préserver la confidentialité de ses identifiants et à signaler toute utilisation frauduleuse.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
    <p className="mb-4">
      Pour toute question ou réclamation, contactez-nous à l'adresse suivante : <a href="mailto:contact@bingphoto.fr" className="underline text-blue-600">contact@bingphoto.fr</a>
    </p>
  </div>
);

export default MentionsLegalesPage; 