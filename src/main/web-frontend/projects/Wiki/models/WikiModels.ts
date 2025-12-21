

export type WikiSidebarPage = {
  type: "WikiSidebarPage"
  id: string
  name: string,
}

export type WikiSidebarFolder = {
  type: "WikiSidebarFolder",
  id: string,
  name: string,
  children: Array<WikiSidebarItem>
}

export type WikiSidebarItem = WikiSidebarPage | WikiSidebarFolder