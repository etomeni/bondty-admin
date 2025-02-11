export const pendingDates = [
    {
      id: 1,
      location: "Puzzles Abuja",
      participants: ["Maria", "Joseph"],
      security: { primary: true, secondary: false },
      logistics: { primary: false, secondary: false },
      isSolo: false,
      date: "Nov 14, 2024",
      time: "7:00 pm",
      type: "VVIP",
      venue: {
        name: "Puzzles Abuja",
        address: "Gwarimpa, Abuja",
        rating: 4,
        image: "/placeholder.svg?height=200&width=200",
      },
      participantsDetails: [
        {
          name: "Joseph",
          image:
            "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
          pickupLocation: "House 1 amore streret, katampe, Abuja",
          logistics: "Black Chevrolet Camaro",
          security: "Nill",
          question: "How do you spell pineapples",
        },
        {
          name: "Maria",
          image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
          pickupLocation: "House 1 amore streret, katampe, Abuja",
          logistics: "Nill",
          security: {
            details: "1 male",
            gss: "+234 816 214 1984",
          },
          question: "How do you spell pineapples",
        },
      ],
    },
    {
      id: 3,
      location: "Puzzles Abuja",
      participants: ["Maria", "Joseph"],
      security: { primary: true, secondary: false },
      logistics: { primary: false, secondary: false },
      isSolo: false,
      date: "Nov 14, 2024",
      time: "7:00 pm",
      type: "VVIP",
      venue: {
        name: "Puzzles Abuja",
        address: "Gwarimpa, Abuja",
        rating: 4,
        image: "/placeholder.svg?height=200&width=200",
      },
      participantsDetails: [
        {
          name: "Joseph",
          image:
            "https://images.unsplash.com/photo-1672675225389-4d7b6f231f5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fHww",
          pickupLocation: "House 1 amore streret, katampe, Abuja",
          logistics: "Black Chevrolet Camaro",
          security: "Nill",
          question: "How do you spell pineapples",
        },
        {
          name: "Maria",
          image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
          pickupLocation: "House 1 amore streret, katampe, Abuja",
          logistics: "Nill",
          security: {
            details: "1 male",
            gss: "+234 816 214 1984",
          },
          question: "How do you spell pineapples",
        },
      ],
    },
    {
      id: 2,
      location: "Puzzles Abuja",
      participants: ["Chioma"],
      security: { primary: true, secondary: false },
      logistics: { primary: false, secondary: false },
      isSolo: false,
      date: "Nov 14, 2024",
      time: "7:00 pm",
      type: "VVIP",
      venue: {
        name: "Puzzles Abuja",
        address: "Gwarimpa, Abuja",
        rating: 4,
        image: "/placeholder.svg?height=200&width=200",
      },
      participantsDetails: [
        {
          name: "Chioma",
          image:
            "https://cdn2.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg.webp",
          pickupLocation: "House 1 amore streret, katampe, Abuja",
          logistics: "Black Chevrolet Camaro",
          security: "Nill",
          question: "How do you spell pineapples",
        },
      ],
    },
    // ... other dates remain the same
  ]
  
  export function getDateById(id: number) {
    return pendingDates.find((date) => date.id === id)
  }
  
  