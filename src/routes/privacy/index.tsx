import { $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { cookieBannerStorage } from '~/providers/cookie-banner-provider';
import { Button } from '~/ui/common/button';
import { ArrowLeftIcon } from '~/ui/icons/arrow-left';
import { FooterBar } from '~/ui/layout/footer-bar';
import { buildHead } from '~/utils/build-head';
import { storageRemove } from '~/utils/storage';

export default () => (
  <>
    <a
      class="absolute xl:fixed top-4 left-4 gap-1 font-semibold text-ink text-sm underline flex items-center"
      href="/"
    >
      <ArrowLeftIcon /> Go back home
    </a>
    <div class="relative mx-auto custom-container">
      <main id="intro" class="relative mt-24">
        <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
          Privacy policy
        </h1>
      </main>
      <section class="my-8 mb-32">
        <p>Last updated: 2025-02-13</p>
        <h1 class="text-xl font-bold pb-4 pt-8">Update your cookie settings</h1>
        <p>
          You can reset your cookie settings at any time by clicking the button below, once clicked,
          you will be redirected to the homepage.
        </p>
        <Button
          variant="fill"
          class="mt-2"
          onClick$={$(() => {
            storageRemove(cookieBannerStorage);
            document.location = '/';
          })}
        >
          Reset cookies settings
        </Button>
        <h2 class="text-xl font-semibold pb-4 pt-12">1. Introduction</h2>
        <p>
          Welcome to{' '}
          <a class="text-link" href="/">
            emje.dev
          </a>{' '}
          where I make it a point to put your privacy at the forefront. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 class="text-xl font-semibold pb-4 pt-8">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul class="flex flex-col pt-2 pl-2 gap-2">
          <li>
            - <b>Personal Information</b>: Name, email address, and other contact details if you
            provide them voluntarily (e.g. through the contact form).
          </li>
          <li>
            - <b>Usage Data</b>: Information about how you use our website, including IP address,
            browser type, pages visited, diagnostic errors, and time spent.
          </li>
          <li>
            - <b>Cookies and Tracking Technologies</b>: We collect cookies for analytics purposes.
            You can accept or reject them at any time through the cookie banner when you first land
            on the website and through the "reset cookies" button located at the top of this page.
          </li>
        </ul>
        <h2 class="text-xl font-semibold pb-4 pt-8">3. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul class="flex flex-col pt-2 pl-2 gap-2">
          <li>- Improve website functionality and user experience.</li>
          <li>- Analyze website traffic and trends.</li>
          <li>- Respond to inquiries or support requests.</li>
        </ul>
        <h2 class="text-xl font-semibold pb-4 pt-8">4. How We Share Your Information</h2>
        <p>We do not sell or rent your personal data. However, we may share information with:</p>

        <ul class="flex flex-col pt-2 pl-2 gap-2">
          <li>
            - <b>Service Providers</b>: Third-party analytics providers to help us understand
            website usage.
          </li>
          <li>
            - <b>Legal Authorities</b>: When required by law or to protect our rights.
          </li>
        </ul>
        <h2 class="text-xl font-semibold pb-4 pt-8">5. Your Choices</h2>
        <p>
          You may contact us to request access, correction, or deletion of your personal data using
          the contact form located{' '}
          <a href="/" class="text-link">
            on the homepage.
          </a>
        </p>
        <h2 class="text-xl font-semibold pb-4 pt-8">6. Data Security</h2>
        <p>
          We take reasonable measures to protect your information from unauthorized access or
          disclosure.
        </p>
        <h2 class="text-xl font-semibold pb-4 pt-8">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites. We are not responsible for their
          privacy practices.{' '}
        </p>
        <h2 class="text-xl font-semibold pb-4 pt-8">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this policy from time to time. The latest version will always be available
          on our website through the <code class="bg-papyrus">/privacy</code> url. Any enhancements
          to the privacy policy will require you to reconfirm cookie usage, as per best practices.
        </p>
        <h2 class="text-xl font-semibold pb-4 pt-8">9. Contact Us</h2>
        <p>
          If you have any questions, please contact us through the website contact form located{' '}
          <a href="/" class="text-link">
            on the homepage.
          </a>
        </p>
      </section>
    </div>
    <FooterBar />
  </>
);

export const head: DocumentHead = buildHead({
  title: 'Privacy policy',
  description: 'emje.dev privacy policy',
});
