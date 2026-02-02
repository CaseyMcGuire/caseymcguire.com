

export type WikiSidebarPage = {
  type: "WikiSidebarPage",
  id: string,
  name: string,
  wikiId: string
}

export type WikiSidebarFolder = {
  type: "WikiSidebarFolder",
  id: string,
  name: string,
  children: Array<WikiSidebarItem>,
  wikiId: string
}

export type WikiSidebarItem = WikiSidebarPage | WikiSidebarFolder
