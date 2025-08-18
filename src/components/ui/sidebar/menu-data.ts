import {  Package, User } from "lucide-react"

export const menuData = [
  {
    group: "Manager Products",
    items: [
      { 
        title: "Products",
        icon: Package,
        children: [
          { title: "All Product", href: "/products" },
          { title: "Add Product", href: "/products/add" },
        ]
      },
      
    ]
  },
  {
    group: "Manager Users",
    items: [
      { title: "Users", href: "/users", icon: User },
    ]
  },
]
