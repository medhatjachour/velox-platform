/**
 * NFC Cards Management Page
 * 
 * Manage NFC cards and view tap analytics
 */

'use client';

import { useState } from 'react';
import { Plus, CreditCard, Eye, Copy, Check, QrCode } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NFCCardsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  // TODO: Fetch from API
  const nfcCards: any[] = [];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            NFC Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your NFC business cards
          </p>
        </div>
        <Link href="/dashboard/nfc/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create NFC Card
          </Button>
        </Link>
      </div>

      {/* Cards List */}
      {nfcCards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No NFC cards yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
              Create your first NFC card to share your portfolio with a simple tap
            </p>
            <Link href="/dashboard/nfc/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First NFC Card
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfcCards.map((card) => (
            <Card key={card.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">
                      {card.portfolio?.title || 'Untitled Portfolio'}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Card ID: {card.cardUid}
                    </CardDescription>
                  </div>
                  <Badge variant={card.isActive ? 'default' : 'secondary'}>
                    {card.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tap URL */}
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Tap URL
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs truncate">
                      velox.app/tap/{card.shortCode}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(
                          `https://velox.app/tap/${card.shortCode}`,
                          card.id
                        )
                      }
                    >
                      {copied === card.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{card.tapCount || 0} taps</span>
                  </div>
                  <Link href={`/dashboard/nfc/${card.id}/qr`}>
                    <Button size="sm" variant="outline">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                  </Link>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <Link href={`/dashboard/nfc/${card.id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>How NFC Cards Work</CardTitle>
            <CardDescription>
              Share your portfolio with a single tap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <p>Create an NFC card and link it to your portfolio</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <p>Write the tap URL to your physical NFC card</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <p>Share your portfolio by tapping your card</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">4</span>
              </div>
              <p>Track taps and capture leads automatically</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              NFC Card Quota
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Free: 1 card • Pro: 3 cards • Premium: Unlimited
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                {nfcCards.length} of 1 cards used
              </p>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
