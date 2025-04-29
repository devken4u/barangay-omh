"use client";

import { Button } from "@/components/ui/button";
import { VerifiedDocument } from "@/types";
import { QrCode } from "lucide-react";
import QRCode from "qrcode";

function DownloadVerifiedDocumentQrCode({ row }: { row: VerifiedDocument }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const verifiedLink = `${BASE_URL}/verified-document/${row._id}`;

  return (
    <div>
      <Button
        onClick={async () => {
          const dataUrl = await QRCode.toDataURL(verifiedLink, {
            width: 500,
          });
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${row.owner_name}-${row.document_type}.png`;
          link.click();
        }}
        variant="outline"
        size="sm"
      >
        <QrCode />
      </Button>
    </div>
  );
}

export default DownloadVerifiedDocumentQrCode;
