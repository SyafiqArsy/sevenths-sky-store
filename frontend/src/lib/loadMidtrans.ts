export function loadMidtransScript() {
  return new Promise<void>((resolve) => {

    const existingScript =
      document.getElementById(
        "midtrans-script"
      );

    if (existingScript) {
      resolve();
      return;
    }

    const script =
      document.createElement("script");

    script.id =
      "midtrans-script";

    script.src =
      "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute(
      "data-client-key",
      process.env
        .NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );

    script.onload = () => resolve();

    document.body.appendChild(
      script
    );
  });
}