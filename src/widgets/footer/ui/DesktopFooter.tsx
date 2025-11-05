//Disable eslint for this file as it is not used in app
/* eslint-disable */

import { Container } from "@/shared/ui/container";

export const DesktopFooter = () => {
  return (
    <footer className="border-t">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FitTrack by Philipp Litzenberger
          </p>
          <div className="flex space-x-6">
            {/** Contact Links of creator */}
            {/**LinkedIn */}
            <a
              href="https://linkedin.com/in/philipp-litzenberger-a0896937b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span>LinkedIn</span>
            </a>
            {/**GitHub */}
            <a
              href="https://github.com/phmshk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
