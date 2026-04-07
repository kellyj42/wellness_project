export const homeQuery = `
*[_type == "home"][0]{
  introText,
  conceptText,
  uniquePoints,
  ctaText,

  heroImage{
    asset->{url}
  },

  uniqueGallery[]{
    asset->{url}
  }
}
`




export const founderQuery = `
*[_type == "founder"][0]{
  name,
  title,
  bio,
  credentials,
  vision,
  image{
    asset->{
      url
    }
  }
}
`

export const classesQuery = `
*[_type == "classType"] | order(name asc){
  _id,
  name,
  description,
  maxParticipants
}
`
// queries.ts
export const privateTrainingQuery = `
*[_type == "privateTraining"][0]{
  heroHeadline,
  heroSubtext,
  heroImage {
    asset->{url}
  },
  introText,
  reformer {
    title,
    description,
    priceSingle,
    pricePack,
    image {
      asset->{url}
    }
  },
  personalTraining {
    title,
    description,
    packages[]{
      label,
      amount,
      note
    },
    image {
      asset->{url}
    }
  },
  philosophy,
  ctaText
}
`
// queries.ts
export const chatbotQuery = `
*[_type == "chatbot"][0]{
  name,
  title,
  avatar {
    asset->{url}
  },
  welcomeMessage,
  fallbackMessage,
  faqs[]{
    question,
    keywords,
    answer,
    links[]{
      text,
      url
    },
    priority
  },
  suggestedQuestions,
  hours,
  contactInfo,
  isActive
}
`
// sanity/lib/queries.ts
export const classTypesQuery = `
*[_type == "classType"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  maxParticipants,
  duration,
  level,
  category,
  equipment,
  benefits,
  singlePrice,
  packagePrice,
  packageValidity,
  color,
  image {
    asset->{
      url
    }
  }
}
`;

export const classScheduleQuery = `
*[_type == "classSchedule" && isActive == true][0] {
  weekStart,
  days[] {
    day,
    date,
    classes[] {
      time,
      spots,
      instructor,
      room,
      classType->{
        _id,
        name,
        color,
        duration,
        maxParticipants,
        image {
          asset->{url}
        }
      }
    }
  }
}
`;

export const pricingQuery = `
*[_type == "pricing"] | order(order asc) {
  _id,
  title,
  description,
  price,
  duration,
  features[],
  popular
}
`;

export const contactQuery = `
*[_type == "contact"][0]{
  phone,
  email,
  address,
  hoursText,
  socialLinks[]{
    platform,
    url
  },
  mapEmbed
}
`;

export const teachersQuery = `
*[_type == "teacher"] | order(order asc, name asc) {
  _id,
  name,
  title,
  bio,
  specialties,
  rating,
  sessions,
  isFeatured,
  image {
    asset->{url}
  }
}
`;

export const eventsQuery = `
*[_type == "event" && isPublished == true] | order(startDate asc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  description,
  startDate,
  endDate,
  location,
  instructor,
  price,
  capacity,
  tags,
  bookingUrl,
  featured,
  image {
    asset->{url}
  }
}
`;

export const featuredEventPromoQuery = `
*[
  _type == "event" &&
  isPublished == true &&
  dateTime(coalesce(endDate, startDate)) >= dateTime(now())
] | order(featured desc, startDate asc)[0] {
  _id,
  title,
  summary,
  startDate,
  endDate,
  location,
  price,
  bookingUrl,
  featured
}
`;
