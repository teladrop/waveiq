"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Copy,
  DollarSign,
  Users,
  LinkIcon,
  FileText,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Download,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock affiliate data
  const affiliateData = {
    link: "https://waveiq.com/?ref=yourUsername",
    code: "YOURCODE20",
    earnings: "$0.00",
    referrals: 0,
    conversionRate: "0%",
    commissionRate: "30%",
    payoutThreshold: "$50",
    nextPayout: "No pending payout",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Affiliate Program</h1>
          <p className="text-gray-300 mt-2">Earn commissions by referring creators to WaveIQ</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{affiliateData.earnings}</div>
              <p className="text-xs text-gray-400">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Referrals</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{affiliateData.referrals}</div>
              <p className="text-xs text-gray-400">Total referred users</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Conversion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{affiliateData.conversionRate}</div>
              <p className="text-xs text-gray-400">Visitors to customers</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Next Payout</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{affiliateData.nextPayout}</div>
              <p className="text-xs text-gray-400">Minimum: {affiliateData.payoutThreshold}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Marketing Materials</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">How It Works</CardTitle>
                <CardDescription className="text-gray-400">
                  Earn recurring commissions by referring new users to WaveIQ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <LinkIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">1. Share Your Link</h3>
                    <p className="text-gray-400">Share your unique affiliate link with your audience</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">2. Refer Users</h3>
                    <p className="text-gray-400">
                      When users sign up through your link, they're tracked as your referrals
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">3. Earn Commissions</h3>
                    <p className="text-gray-400">
                      Earn {affiliateData.commissionRate} commission on all paid subscriptions
                    </p>
                  </div>
                </div>

                <Alert className="bg-primary/10 border-primary/30 text-white">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-white">Commission Structure</AlertTitle>
                  <AlertDescription className="text-gray-300">
                    Earn {affiliateData.commissionRate} commission on all paid plans for the lifetime of the customer.
                    Payouts are processed monthly when your balance exceeds {affiliateData.payoutThreshold}.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Affiliate Links</CardTitle>
                <CardDescription className="text-gray-400">
                  Share these links with your audience to start earning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Affiliate Link</label>
                  <div className="flex">
                    <Input
                      value={affiliateData.link}
                      readOnly
                      className="bg-background border-gray-700 text-white rounded-r-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(affiliateData.link)}
                      className="rounded-l-none bg-primary hover:bg-primary/90"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Discount Code</label>
                  <div className="flex">
                    <Input
                      value={affiliateData.code}
                      readOnly
                      className="bg-background border-gray-700 text-white rounded-r-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(affiliateData.code)}
                      className="rounded-l-none bg-primary hover:bg-primary/90"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">This code gives new users 20% off their first month</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Promotional Materials</CardTitle>
                <CardDescription className="text-gray-400">
                  Use these assets to promote WaveIQ to your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Banners & Graphics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="h-24 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <span className="text-white font-bold">WaveIQ Banner 728x90</span>
                        </div>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>

                      <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="h-24 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <span className="text-white font-bold">WaveIQ Square 300x250</span>
                        </div>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Email Templates & Copy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center mb-3">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-white font-medium">Email Template</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          "Discover how I grew my YouTube channel with WaveIQ..."
                        </p>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                          <Copy className="h-4 w-4 mr-2" /> Copy Template
                        </Button>
                      </div>

                      <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center mb-3">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-white font-medium">Social Media Posts</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          "Want to grow your YouTube channel faster? I've been using WaveIQ to..."
                        </p>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                          <Copy className="h-4 w-4 mr-2" /> Copy Posts
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Promotional Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Share your personal success story with WaveIQ to build credibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Create a tutorial video showing how you use WaveIQ for your channel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Include your affiliate link in video descriptions and pinned comments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Mention the 20% discount code in your videos to incentivize sign-ups</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Share before/after results of using WaveIQ's keyword research tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Overview</CardTitle>
                <CardDescription className="text-gray-400">Track your affiliate marketing performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                  <p className="text-gray-300 mb-4">
                    Your affiliate dashboard will be available once you start referring users.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <LinkIcon className="h-4 w-4 mr-2" /> Get Started with Referrals
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-700 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-4 py-3 text-left text-white">Date</th>
                        <th className="px-4 py-3 text-left text-white">Amount</th>
                        <th className="px-4 py-3 text-left text-white">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3 text-gray-300" colSpan={3}>
                          No payout history available yet
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-primary">
                      How does the affiliate program work?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Our affiliate program allows you to earn {affiliateData.commissionRate} commission on all paid
                      subscriptions that come through your unique affiliate link. The commission is recurring, meaning
                      you'll earn for as long as the referred user remains a paying customer.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-primary">
                      When and how do I get paid?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Payments are processed monthly for all earnings that exceed the {affiliateData.payoutThreshold}{" "}
                      threshold. We offer payments via PayPal, Stripe, or bank transfer. You can set your preferred
                      payment method in your affiliate settings.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-primary">
                      How long are referrals tracked?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      When someone clicks your affiliate link, they're tracked for 30 days. If they sign up within that
                      period, they'll be counted as your referral, even if they don't immediately purchase a paid plan.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-primary">
                      Can I promote WaveIQ on multiple platforms?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      Yes! You can promote WaveIQ on your website, YouTube channel, social media, email newsletters, or
                      any other platform where you have an audience. Just make sure to follow our affiliate guidelines
                      and FTC disclosure requirements.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-primary">
                      Are there any restrictions on how I can promote WaveIQ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      We prohibit spam, misleading claims, and purchasing ads on branded keywords. Please review our
                      full affiliate terms for complete details on promotional guidelines. We want you to promote WaveIQ
                      in a way that's honest and provides value to your audience.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 hover:border-primary"
                >
                  <HelpCircle className="h-4 w-4 mr-2" /> Contact Affiliate Support
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <FileText className="h-4 w-4 mr-2" /> View Affiliate Terms
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
