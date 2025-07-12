import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Mock user data
const mockUsers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    password: "password123",
    skillsOffered: ["React", "JavaScript", "UI/UX Design"],
    skillsWanted: ["Python", "Machine Learning"],
    rating: 4.8,
    availability: "Evenings",
    isPublic: true,
    bio: "Frontend developer passionate about creating beautiful user experiences. Always eager to learn new technologies!",
    location: "San Francisco, CA",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    password: "password123",
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["React", "Frontend Development"],
    rating: 4.9,
    availability: "Weekends",
    isPublic: true,
    bio: "Data scientist with expertise in machine learning and AI. Looking to expand my frontend skills!",
    location: "New York, NY",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    password: "password123",
    skillsOffered: ["Graphic Design", "Adobe Creative Suite", "Branding"],
    skillsWanted: ["Web Development", "CSS"],
    rating: 4.7,
    availability: "Flexible",
    isPublic: true,
    bio: "Creative designer with a passion for branding and visual communication. Eager to learn web development!",
    location: "Los Angeles, CA",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    password: "password123",
    skillsOffered: ["Node.js", "Backend Development", "Database Design"],
    skillsWanted: ["DevOps", "AWS"],
    rating: 4.6,
    availability: "Evenings",
    isPublic: true,
    bio: "Backend developer specializing in Node.js and database architecture. Looking to learn cloud technologies.",
    location: "Seattle, WA",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    password: "password123",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy"],
    skillsWanted: ["Analytics", "Data Visualization"],
    rating: 4.5,
    availability: "Weekends",
    isPublic: true,
    bio: "Marketing professional with expertise in digital campaigns and SEO. Want to learn data analytics!",
    location: "Chicago, IL",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    password: "password123",
    skillsOffered: ["iOS Development", "Swift", "Mobile UI"],
    skillsWanted: ["Android Development", "Kotlin"],
    rating: 4.8,
    availability: "Flexible",
    isPublic: true,
    bio: "iOS developer passionate about creating intuitive mobile experiences. Looking to expand to Android!",
    location: "Austin, TX",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Rachel Green",
    email: "rachel.green@example.com",
    password: "password123",
    skillsOffered: ["Photography", "Photo Editing", "Lightroom"],
    skillsWanted: ["Video Editing", "After Effects"],
    rating: 4.9,
    availability: "Weekends",
    isPublic: true,
    bio: "Professional photographer with expertise in portrait and landscape photography. Want to learn video editing!",
    location: "Portland, OR",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "James Wilson",
    email: "james.wilson@example.com",
    password: "password123",
    skillsOffered: ["DevOps", "AWS", "Docker"],
    skillsWanted: ["Kubernetes", "Terraform"],
    rating: 4.7,
    availability: "Evenings",
    isPublic: true,
    bio: "DevOps engineer with cloud infrastructure expertise. Looking to master container orchestration!",
    location: "Denver, CO",
    avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Sophie Martinez",
    email: "sophie.martinez@example.com",
    password: "password123",
    skillsOffered: ["Content Writing", "Copywriting", "Blog Writing"],
    skillsWanted: ["Social Media Marketing", "Influencer Marketing"],
    rating: 4.6,
    availability: "Flexible",
    isPublic: true,
    bio: "Content creator and copywriter with a passion for storytelling. Want to learn social media marketing!",
    location: "Miami, FL",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    password: "password123",
    skillsOffered: ["Java", "Spring Boot", "Microservices"],
    skillsWanted: ["React", "TypeScript"],
    rating: 4.8,
    availability: "Evenings",
    isPublic: true,
    bio: "Java developer with microservices architecture experience. Looking to learn modern frontend technologies!",
    location: "Boston, MA",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Anna Davis",
    email: "anna.davis@example.com",
    password: "password123",
    skillsOffered: ["Project Management", "Agile", "Scrum"],
    skillsWanted: ["Product Management", "User Research"],
    rating: 4.9,
    availability: "Weekends",
    isPublic: true,
    bio: "Project manager with agile methodology expertise. Want to transition into product management!",
    location: "Atlanta, GA",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Tom Anderson",
    email: "tom.anderson@example.com",
    password: "password123",
    skillsOffered: ["Cybersecurity", "Penetration Testing", "Network Security"],
    skillsWanted: ["Cloud Security", "Compliance"],
    rating: 4.7,
    availability: "Flexible",
    isPublic: true,
    bio: "Cybersecurity specialist with penetration testing expertise. Looking to expand cloud security knowledge!",
    location: "Washington, DC",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      mockUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Successfully seeded ${createdUsers.length} users`);

    // Display created users
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(seedDatabase); 