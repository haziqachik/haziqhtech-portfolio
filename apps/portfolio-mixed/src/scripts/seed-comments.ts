import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedComments() {
  try {
    console.log('🌱 Seeding sample comments...')

    // Sample comments for blog posts
    const sampleComments = [
      {
        postSlug: "maritime-safeguarding-future",
        authorName: "Alex Chen",
        authorWebsite: "https://linkedin.com/in/alexchen-maritime",
        commentText: "Excellent analysis of Singapore's maritime security operations. The scale of 140,000+ vessel movements really puts the complexity in perspective. As someone working in port operations, I can attest to the critical role of radar surveillance in maintaining maritime safety.",
        isApproved: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        postSlug: "maritime-safeguarding-future",
        authorName: "Sarah Maritime",
        commentText: "The integration of automation with security protocols is fascinating. Your background in both network security and maritime operations gives this analysis real depth. Would love to see more content on radar system configurations.",
        isApproved: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        postSlug: "ccna-ceh-lab-notes",
        authorName: "David Kumar",
        authorWebsite: "https://github.com/dkumar-networks",
        commentText: "These lab setups are incredibly detailed! The combination of Packet Tracer and GNS3 examples is perfect for both beginners and experienced network engineers. Bookmarking this for my CCNA study group.",
        isApproved: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        postSlug: "ccna-ceh-lab-notes",
        authorName: "Lisa Rodriguez", 
        commentText: "The OSPF configuration examples are spot-on. I've been struggling with area border router setups, and your documentation made it click. The security hardening section is also very relevant for current network threats.",
        isApproved: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        postSlug: "preflight-power-bi-automation", 
        authorName: "Marcus Thompson",
        authorWebsite: "https://powerbi-community.com/marcus",
        commentText: "Your automation approach with FormSG and UiPath is brilliant. We're implementing similar workflows at our firm. The pre-flight validation steps you've outlined could prevent so many data quality issues downstream.",
        isApproved: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
      },
      {
        postSlug: "preflight-power-bi-automation",
        authorName: "Jennifer Park",
        commentText: "This is exactly what our data team needs! The combination of government forms (FormSG) with RPA automation shows real practical experience. Would you consider writing a follow-up on error handling in UiPath workflows?",
        isApproved: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ]

    // Insert sample comments
    for (const comment of sampleComments) {
      await prisma.blogComment.create({
        data: comment
      })
      console.log(`✅ Added comment by ${comment.authorName} on ${comment.postSlug}`)
    }

    console.log('🎉 Sample comments seeded successfully!')
    
    // Verify the count
    const commentCount = await prisma.blogComment.count()
    console.log(`📊 Total comments in database: ${commentCount}`)

  } catch (error) {
    console.error('❌ Error seeding comments:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
if (require.main === module) {
  seedComments()
}

export { seedComments }