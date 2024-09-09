// openapi.spec.js

export const openapispec = {
  openapi: "3.0.3",
  info: {
    title: "My API",
    description: "API documentation for My API.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://edtech-server-beige.vercel.app/api/v1",
      description: "Local server",
    },
  ],
  paths: {
    "/users/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/users/login": {
      post: {
        summary: "Log in a user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/profile": {
      get: {
        summary: "Get user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "User profile retrieved successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/update-profile": {
      post: {
        summary: "Update user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User profile updated successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/delete-profile": {
      post: {
        summary: "Delete user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          204: {
            description: "User profile deleted successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/logout": {
      post: {
        summary: "Log out a user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "User logged out successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/courses/create-course": {
      post: {
        summary: "Create a new course",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  instructorId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Course created successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/courses/showallcourses": {
      get: {
        summary: "Get all courses",
        responses: {
          200: {
            description: "List of all courses",
          },
        },
      },
    },
    "/courses/get-course": {
      post: {
        summary: "Get details of a specific course",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Course details retrieved successfully",
          },
          404: {
            description: "Course not found",
          },
        },
      },
    },
    "/sections/create-section": {
      post: {
        summary: "Create a new section",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseId: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Section created successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/sections/update-section": {
      post: {
        summary: "Update a section",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sectionId: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Section updated successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/sections/delete-section": {
      post: {
        summary: "Delete a section",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sectionId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Section deleted successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/subsections/create-subsection": {
      post: {
        summary: "Create a new subsection",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sectionId: {
                    type: "string",
                  },
                  title: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Subsection created successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/subsections/create-review": {
      post: {
        summary: "Create a new review",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseId: {
                    type: "string",
                  },
                  review: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Review created successfully",
          },
        },
      },
    },
    "/subsections/review": {
      get: {
        summary: "Get all reviews",
        responses: {
          200: {
            description: "List of all reviews",
          },
        },
      },
    },
    "/payments/buy": {
      post: {
        summary: "Capture payment",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  amount: {
                    type: "number",
                  },
                  currency: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Payment captured successfully",
          },
          401: {
            description: "Unauthorized",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/payments/verify": {
      post: {
        summary: "Verify payment signature",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  paymentId: {
                    type: "string",
                  },
                  signature: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Payment signature verified successfully",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/categories/create-category": {
      post: {
        summary: "Create a new category",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Category created successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/categories/showallcategory": {
      get: {
        summary: "Get all categories",
        responses: {
          200: {
            description: "List of all categories",
          },
        },
      },
    },
    "/categories/getcategorydetails": {
      post: {
        summary: "Get details of a specific category",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Category details retrieved successfully",
          },
          404: {
            description: "Category not found",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
