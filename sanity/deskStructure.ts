import type { StructureResolver } from "sanity/structure";

const apartmentDocs = [
  { title: "IMPERIO 1", documentId: "apartment-imperio-1", templateId: "apartment-imperio-1" },
  { title: "IMPERIO 2", documentId: "apartment-imperio-2", templateId: "apartment-imperio-2" },
  { title: "IMPERIO 3", documentId: "apartment-imperio-3", templateId: "apartment-imperio-3" }
];

const apartmentDocument = (S: Parameters<StructureResolver>[0], item: (typeof apartmentDocs)[number], title = item.title) =>
  S.document()
    .schemaType("apartment")
    .documentId(item.documentId)
    .initialValueTemplate(item.templateId)
    .title(title);

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Escritorio")
    .items([
      S.listItem()
        .title("Portada principal")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .initialValueTemplate("siteSettings")
            .title("Portada principal")
        ),
      S.divider(),
      S.listItem()
        .title("Apartamentos")
        .child(
          S.list()
            .title("Apartamentos")
            .items(apartmentDocs.map((item) => S.listItem().title(item.title).child(apartmentDocument(S, item))))
        ),
      S.divider(),
      S.listItem()
        .title("Galerias de fotos")
        .child(
          S.list()
            .title("Galerias de fotos")
            .items(
              apartmentDocs.map((item) =>
                S.listItem().title(`Galeria ${item.title}`).child(apartmentDocument(S, item, `Galeria ${item.title}`))
              )
            )
        ),
      S.listItem()
        .title("Mapas y pines")
        .child(
          S.list()
            .title("Mapas y pines")
            .items(
              apartmentDocs.map((item) =>
                S.listItem().title(`Mapa ${item.title}`).child(apartmentDocument(S, item, `Mapa ${item.title}`))
              )
            )
        ),
      S.listItem()
        .title("SEO y reserva directa")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .initialValueTemplate("siteSettings")
            .title("SEO y reserva directa")
        )
    ]);
