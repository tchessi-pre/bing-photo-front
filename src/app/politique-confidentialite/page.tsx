"use client";

import React from "react";

const PolitiqueConfidentialitePage: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8 mb-8">
    <h1 className="text-3xl font-bold mb-6 text-center">Politique de confidentialité</h1>

    <p className="mb-4">
      <strong>Date de dernière mise à jour :</strong> 10 juillet 2025
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
    <p className="mb-4">
      La présente politique de confidentialité a pour objectif d’informer les utilisateurs de l’application Bing Photo sur la collecte, l’utilisation, la conservation, la protection et le partage de leurs données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) n°2016/679.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. Responsable du traitement</h2>
    <p className="mb-4">
      Le responsable du traitement des données à caractère personnel est : <br />
      <strong>Bing Photo SAS</strong> <br />
      123, rue de la Photo, 13004 Marseille, France <br />
      Email : contact@bingphoto.fr
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Données collectées</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Données d’identification : nom, prénom, adresse e-mail, identifiant utilisateur</li>
      <li>Données de connexion : adresse IP, logs, cookies</li>
      <li>Données de contenu : photos, albums, métadonnées associées (date, lieu, etc.)</li>
      <li>Données de consentement : choix relatifs à l’analyse algorithmique des images</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Finalités du traitement</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Gestion des comptes utilisateurs et authentification</li>
      <li>Stockage, organisation et partage de photos</li>
      <li>Détection de doublons et d’images similaires (après consentement explicite)</li>
      <li>Amélioration de l’expérience utilisateur</li>
      <li>Sécurité et prévention de la fraude</li>
      <li>Gestion des demandes d’exercice de droits</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Base légale du traitement</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Exécution du contrat (CGU)</li>
      <li>Consentement explicite pour l’analyse algorithmique des images</li>
      <li>Intérêt légitime pour la sécurité et l’amélioration du service</li>
      <li>Respect d’obligations légales</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Destinataires des données</h2>
    <p className="mb-4">
      Les données sont accessibles uniquement par les équipes habilitées de Bing Photo et ses sous-traitants techniques (hébergement, maintenance, sécurité), dans le strict respect de la confidentialité et des finalités définies.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">7. Transferts hors Union Européenne</h2>
    <p className="mb-4">
      Les données sont hébergées dans l’Union Européenne. En cas de transfert hors UE, Bing Photo s’engage à garantir un niveau de protection adéquat, notamment par la signature de clauses contractuelles types approuvées par la Commission européenne.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">8. Durée de conservation</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Compte utilisateur : tant que le compte est actif (et 3 ans après la dernière activité)</li>
      <li>Photos et albums : jusqu’à suppression par l’utilisateur ou fermeture du compte</li>
      <li>Logs de connexion : 12 mois</li>
      <li>Consentements : 5 ans à compter de la révocation ou de la suppression du compte</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">9. Sécurité</h2>
    <p className="mb-4">
      Bing Photo met en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité, l’intégrité et la confidentialité des données (chiffrement, contrôle d’accès, audit, sauvegardes…).
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">10. Droits des utilisateurs</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Droit d’accès, de rectification, d’effacement</li>
      <li>Droit à la limitation et à l’opposition</li>
      <li>Droit à la portabilité</li>
      <li>Droit de retirer son consentement à tout moment</li>
      <li>Droit d’introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>)</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">11. Cookies et traceurs</h2>
    <p className="mb-4">
      L’application utilise des cookies strictement nécessaires à son fonctionnement. Tout cookie non essentiel (analyse, publicité) est soumis à votre consentement préalable.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">12. Contact</h2>
    <p className="mb-4">
      Pour toute question ou exercice de vos droits, contactez-nous à l’adresse suivante : <a href="mailto:privacy@bingphoto.fr" className="underline text-blue-600">contact@bingphoto.fr</a>
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">13. Modification de la politique</h2>
    <p className="mb-4">
      Bing Photo se réserve le droit de modifier la présente politique à tout moment. Toute modification substantielle sera notifiée aux utilisateurs.
    </p>
  </div>
);

export default PolitiqueConfidentialitePage;