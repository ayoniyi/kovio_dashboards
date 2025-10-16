/** @format */

import React from "react";
import { privacyPolicy, privacyPolicyHeadings } from "@/Data/privacy-policy";

export default function Privacy() {
  const sections = Object.keys(privacyPolicyHeadings) as Array<
    keyof typeof privacyPolicyHeadings
  >;

  return (
    <div className="container mx-auto py-16">
      <div className="space-y-12 lg:mx-[12.5rem]">
        <h2 className="font-extrabold text-4xl lg:text-5xl leading-loose text-kv-semi-black text-center">
          Privacy Policy
        </h2>

        <section className="space-y-8">
          <p className="text-sm text-kv-text-gray">
            {privacyPolicy.lastUpdate[0]}
          </p>

          {sections.map((sectionKey) => (
            <div key={sectionKey} className="space-y-4">
              <h2 className="text-xl font-normal mb-6">
                {privacyPolicyHeadings[sectionKey]}
              </h2>
              <div className="space-y-4">
                {privacyPolicy[sectionKey].map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
