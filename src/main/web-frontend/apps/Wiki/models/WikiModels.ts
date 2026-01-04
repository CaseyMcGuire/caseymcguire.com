

export type WikiSidebarPage = {
  type: "WikiSidebarPage",
  id: string,
  name: string,
  wikiName: string
}

export type WikiSidebarFolder = {
  type: "WikiSidebarFolder",
  id: string,
  name: string,
  children: Array<WikiSidebarItem>,
  wikiName: string
}

export type WikiSidebarItem = WikiSidebarPage | WikiSidebarFolder