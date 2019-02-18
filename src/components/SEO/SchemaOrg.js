// import path from "path";
import React from "react";
import Helmet from "react-helmet";

export default React.memo(
  ({
    pageType,
    canonicalUrl,
    organization,
    breadcrumbs,
    service,
    article,
    course
  }) => {
    const baseSchema = [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        url: organization.url,
        name: organization.name,
        logo: organization.logo,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: organization.phone,
            contactType: "reservations"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            item: item.href
          };
        })
      }
    ];

    let schema;

    switch (pageType) {
      case "course":
        schema = [
          ...baseSchema,
          {
            "@context": "http://schema.org",
            "@type": "Course",
            name: course.name,
            description: course.description,
            provider: {
              "@type": "Organization",
              name: organization.name,
              sameAs: organization.url
            }
          }
        ];
        break;
      // case "service":
      //   schema = [
      //     ...baseSchema,
      //     {
      //       "@context": "http://schema.org",
      //       "@type": "Product",
      //       name: service.name,
      //       image: service.images.map(
      //         image => `${canonicalUrl}${path.sep}img${path.sep}${image}`
      //       ),
      //       description: service.description,
      //       offers: service.price && {
      //         "@type": "Offer",
      //         priceCurrency: "ZAR",
      //         price: service.price && service.price.replace(/[^0-9$.,]/g, ""),
      //         url: service.url
      //       }
      //     }
      //   ];
      //   break;
      case "article":
        schema = [
          ...baseSchema,
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: article.url,
            name: article.name,
            alternateName: article.alternateName,
            headline: article.name,
            image: {
              "@type": "ImageObject",
              url: article.image
            },
            description: article.description,
            author: {
              "@type": "Person",
              name: article.author.name
            },
            publisher: {
              "@type": "Organization",
              url: organization.url,
              logo: {
                "@type": "ImageObject",
                url: organization.logo
              },
              name: organization.name
            },
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": canonicalUrl
            },
            datePublished: article.datePublished,
            dateModified: article.datePublished
          }
        ];
        break;
      default:
        schema = baseSchema;
    }
    // console.log("schema", JSON.stringify(schema));
    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }
);
