import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const RECAPTCHA_SITE_KEY = '6Le1xQosAAAAAFDWRkBvGRIenTKiHnXXo7xSLboR';
const SKIP_RECAPTCHA_IN_DEV = import.meta.env.VITE_SKIP_RECAPTCHA_IN_DEV === 'true';
const isDevelopment = import.meta.env.DEV;

export const ReCaptcha = forwardRef(({ onVerify, onExpire, onError }, ref) => {
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onVerify, onExpire, onError });
  const isMountedRef = useRef(true);

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError };
  }, [onVerify, onExpire, onError]);

  const reset = () => {
    if (widgetIdRef.current && window.grecaptcha && window.grecaptcha.reset) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  };

  useImperativeHandle(ref, () => ({
    reset,
  }));

  useEffect(() => {
    if (isDevelopment && SKIP_RECAPTCHA_IN_DEV) {
      if (callbacksRef.current.onVerify) {
        callbacksRef.current.onVerify('dev-bypass-token');
      }
      return;
    }

    isMountedRef.current = true;
    let timeoutId = null;

    const loadRecaptcha = () => {
      if (!isMountedRef.current) return;
      
      if (window.grecaptcha && window.grecaptcha.render) {
        if (recaptchaRef.current && !widgetIdRef.current) {
          try {
            if (recaptchaRef.current.children.length > 0) {
              return;
            }
            
            const widgetId = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: (token) => {
                if (callbacksRef.current.onVerify) {
                  callbacksRef.current.onVerify(token);
                }
              },
              'expired-callback': () => {
                if (callbacksRef.current.onExpire) {
                  callbacksRef.current.onExpire();
                }
              },
              'error-callback': () => {
                if (callbacksRef.current.onError) {
                  callbacksRef.current.onError();
                }
              },
            });
            widgetIdRef.current = widgetId;
          } catch (error) {
            if (error.message && error.message.includes('already been rendered')) {
              return;
            }
            console.error('Error rendering reCAPTCHA:', error);
            if (callbacksRef.current.onError) {
              callbacksRef.current.onError();
            }
          }
        }
      } else if (isMountedRef.current) {
        timeoutId = setTimeout(loadRecaptcha, 100);
      }
    };

    if (!window.grecaptcha) {
      const existingScript = document.querySelector('script[src*="recaptcha"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMountedRef.current) {
            loadRecaptcha();
          }
        };
        document.head.appendChild(script);
      } else {
        if (window.grecaptcha) {
          loadRecaptcha();
        } else {
          existingScript.addEventListener('load', () => {
            if (isMountedRef.current) {
              loadRecaptcha();
            }
          });
        }
      }
    } else {
      loadRecaptcha();
    }

    return () => {
      isMountedRef.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (widgetIdRef.current && window.grecaptcha) {
        try {
          if (window.grecaptcha.reset) {
            window.grecaptcha.reset(widgetIdRef.current);
          }
        } catch (error) {
          console.error('Error cleaning up reCAPTCHA:', error);
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  if (isDevelopment && SKIP_RECAPTCHA_IN_DEV) {
    return (
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffc107',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#856404'
      }}>
        ⚠️ Modo desarrollo: reCAPTCHA deshabilitado
      </div>
    );
  }

  return (
    <div className="recaptcha-isolated-wrapper">
      <div ref={recaptchaRef} />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;

