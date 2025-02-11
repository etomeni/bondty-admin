"use client"

import { useState, useEffect } from "react"
import { Search, Bell, Plus, X } from "lucide-react"
import apiClient from "../utils/apiClient"

interface Book {
  id: number
  title: string
  author: string
  price: number
  rating: number
  cover_url: string
  category: string
}

interface Category {
  value: string
  label: string
}

const dummyBooks: Book[] = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "Batman vs Superman",
    author: "DC Comics",
    price: 19.99,
    rating: 5,
    cover_url: "https://i.ebayimg.com/images/g/cMIAAOSwDahiErVI/s-l1200.jpg",
    category: "Comics",
  }))

export default function Library() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAddBookStep1Open, setIsAddBookStep1Open] = useState(false)
  const [isAddBookStep2Open, setIsAddBookStep2Open] = useState(false)
  const [isEditBookStep1Open, setIsEditBookStep1Open] = useState(false)
  const [isEditBookStep2Open, setIsEditBookStep2Open] = useState(false)

  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedBookCategory, setSelectedBookCategory] = useState<Category | null>(null)
  const [selectedEditCategory, setSelectedEditCategory] = useState<Category | null>(null)

  const [newCategory, setNewCategory] = useState("")
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookFile, setNewBookFile] = useState<File | null>(null)
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null)

  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.get("admin/book/all")

      setBooks(response.data.data || [])
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab")
      setBooks(dummyBooks)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("admin/book/all-categories")

      const formattedCategories = (response.data.data || []).map((cat: any) => ({
        value: cat.id,
        label: cat.name,
      }))

      setCategories(formattedCategories)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab")
    }
  }

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return

    try {
      await apiClient.post("admin/book/new-category", {
        name: newCategory,
        description: newCategory,
      })

      await fetchCategories()
      setNewCategory("")
      setIsCategoryModalOpen(false)
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab")
    }
  }

  const handleAddBook = async () => {
    if (!newBookTitle || !newBookFile || !newCoverImage || !selectedBookCategory) return

    try {
      const formData = new FormData()
      formData.append("title", newBookTitle)
      formData.append("category_id", selectedBookCategory.value)
      formData.append("book_file", newBookFile)
      formData.append("cover_image", newCoverImage)

      await apiClient.post("admin/book/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await fetchBooks()
      setNewBookTitle("")
      setSelectedBookCategory(null)
      setNewBookFile(null)
      setNewCoverImage(null)
      setIsAddBookStep1Open(false)
      setIsAddBookStep2Open(false)
    } catch (err) {
      setError("Oops! Something went wrong. Please try again.")
    }
  }

  const handleSaveEdit = async () => {
    if (!editingBook || !newBookTitle || !selectedEditCategory) return

    try {
      const formData = new FormData()
      formData.append("id", editingBook.id.toString())
      formData.append("title", newBookTitle)
      formData.append("category_id", selectedEditCategory.value)
      if (newBookFile) formData.append("book_file", newBookFile)
      if (newCoverImage) formData.append("cover_image", newCoverImage)

      await apiClient.patch("admin/book/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await fetchBooks()
      setEditingBook(null)
      setNewBookTitle("")
      setSelectedEditCategory(null)
      setNewBookFile(null)
      setNewCoverImage(null)
      setIsEditBookStep1Open(false)
      setIsEditBookStep2Open(false)
    } catch (err) {
      setError("Oops! Something went wrong. Please try again.")
    }
  }

  const handleDeleteBook = async (id: number) => {
    try {
      await apiClient.delete("admin/book/delete", {
        data: { id },
      })

      await fetchBooks()
    } catch (err) {
      setError("Oops! something is wrong try reloading this tab")
    }
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setNewBookTitle(book.title)
    const bookCategory = categories.find((cat) => cat.value === book.category)
    setSelectedEditCategory(bookCategory || null)
    setIsEditBookStep1Open(true)
  }

  const displayBooks = books.length > 0 ? books : dummyBooks

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="bg-white min-h-screen p-6 component-border">
        <header className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5820CC] text-gray-900"
              placeholder="Search category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Bell className="text-gray-600 cursor-pointer" />
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
              <X className="h-6 w-6 text-red-500" />
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <select
            className="bg-indigo-100 text-[#6C38FF] py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5820CC]"
            value={selectedCategory?.value || ""}
            onChange={(e) => {
              const category = categories.find((cat) => cat.value === e.target.value)
              if (category) {
                setSelectedCategory(category)
              } else if (e.target.value === "create-category") {
                setIsCategoryModalOpen(true)
              }
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
            <option value="create-category">Create Category</option>
          </select>
          <button
            className="bg-[#E9E3FF] text-[#6C38FF] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#DCD3FF]"
            onClick={() => setIsAddBookStep1Open(true)}
          >
            Add book
            <Plus className="mr-2" size={16} />
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-gray-600 text-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {displayBooks
              .filter(
                (book) =>
                  book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  book.author.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((book) => (
                <div key={book.id} className="relative group flex flex-col">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={book.cover_url || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <button
                        className="w-24 bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-300"
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-24 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                            handleDeleteBook(book.id)
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-center text-gray-800 font-medium truncate px-2">{book.title}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add Book Modal - Step 1 */}
      {isAddBookStep1Open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md h-[600px]">
            <div className="flex justify-between items-center p-6 border-b">
              <X className="cursor-pointer text-gray-900" onClick={() => setIsAddBookStep1Open(false)} />
            </div>
            <div className="p-6 space-y-6">
              <select
                value={selectedBookCategory?.value || ""}
                onChange={(e) => {
                  const category = categories.find((cat) => cat.value === e.target.value)
                  setSelectedBookCategory(category || null)
                }}
                className="w-[45%] p-3 border bg-[#6C38FF] text-white rounded-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Book Title"
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
                className="w-full p-3 border rounded-sm text-gray-900 placeholder-gray-500"
              />

              <div className="flex flex-col items-center justify-center">
                <label className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#6C38FF] transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setNewBookFile(file)
                      }
                    }}
                    className="hidden"
                  />
                  {newBookFile ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-red-100">
                      <span className="font-bold text-red-600 text-lg">PDF</span>
                      <span className="text-sm text-red-600 mt-2">{newBookFile.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="bg-[#6C38FF] text-white px-4 py-1 rounded-full text-sm">Document</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="border-t p-6">
              <button
                onClick={() => {
                  if (newBookTitle && selectedBookCategory && newBookFile) {
                    setIsAddBookStep1Open(false)
                    setIsAddBookStep2Open(true)
                  } else {
                    setError("Please fill in all fields before proceeding.")
                  }
                }}
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5820CC] transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal - Step 2 */}
      {isAddBookStep2Open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md h-[600px] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setIsAddBookStep2Open(false)
                    setIsAddBookStep1Open(true)
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">Upload cover image</h2>
              </div>
              <X className="cursor-pointer text-gray-900" onClick={() => setIsAddBookStep2Open(false)} />
            </div>

            <div className="flex-grow flex flex-col justify-center items-center p-6">
              <label className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#6C38FF] transition-colors mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setNewCoverImage(file)
                    }
                  }}
                  className="hidden"
                />
                {newCoverImage ? (
                  <img
                    src={URL.createObjectURL(newCoverImage) || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="bg-[#6C38FF] text-white px-4 py-1 rounded-full text-sm">Document</span>
                  </div>
                )}
              </label>
            </div>

            <div className="border-t p-6">
              <button
                onClick={handleAddBook}
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5820CC] transition duration-300 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal - Step 1 */}
      {isEditBookStep1Open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md h-[600px]">
            <div className="flex justify-between items-center p-6 border-b">
              <X className="cursor-pointer text-gray-900" onClick={() => setIsEditBookStep1Open(false)} />
            </div>
            <div className="p-6 space-y-6">
              <select
                value={selectedEditCategory?.value || ""}
                onChange={(e) => {
                  const category = categories.find((cat) => cat.value === e.target.value)
                  setSelectedEditCategory(category || null)
                }}
                className="w-[45%] p-3 border bg-[#6C38FF] text-white rounded-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Book Title"
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
                className="w-full p-3 border rounded-sm text-gray-900 placeholder-gray-500"
              />

              <div className="flex flex-col items-center justify-center">
                <label className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#6C38FF] transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setNewBookFile(file)
                      }
                    }}
                    className="hidden"
                  />
                  {newBookFile ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-red-100">
                      <span className="font-bold text-red-600 text-lg">PDF</span>
                      <span className="text-sm text-red-600 mt-2">{newBookFile.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="bg-[#6C38FF] text-white px-4 py-1 rounded-full text-sm">Document</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="border-t p-6">
              <button
                onClick={() => {
                  if (newBookTitle && selectedEditCategory) {
                    setIsEditBookStep1Open(false)
                    setIsEditBookStep2Open(true)
                  } else {
                    setError("Please fill in all fields before proceeding.")
                  }
                }}
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5820CC] transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal - Step 2 */}
      {isEditBookStep2Open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md h-[600px] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setIsEditBookStep2Open(false)
                    setIsEditBookStep1Open(true)
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">Upload cover image</h2>
              </div>
              <X className="cursor-pointer text-gray-900" onClick={() => setIsEditBookStep2Open(false)} />
            </div>

            <div className="flex-grow flex flex-col justify-center items-center p-6">
              <label className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#6C38FF] transition-colors mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setNewCoverImage(file)
                    }
                  }}
                  className="hidden"
                />
                {newCoverImage ? (
                  <img
                    src={URL.createObjectURL(newCoverImage) || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="bg-[#6C38FF] text-white px-4 py-1 rounded-full text-sm">Document</span>
                  </div>
                )}
              </label>
            </div>

            <div className="border-t p-6">
              <button
                onClick={handleSaveEdit}
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5820CC] transition duration-300 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md h-[400px] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
              <X className="cursor-pointer text-gray-900" onClick={() => setIsCategoryModalOpen(false)} />
            </div>
            <div className="flex-grow flex flex-col justify-center items-center p-6">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-500 mb-6"
              />
            </div>
            <div className="border-t p-6">
              <button
                onClick={handleAddCategory}
                className="w-full bg-[#6C38FF] text-white py-3 rounded-lg hover:bg-[#5820CC] transition duration-300 font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

