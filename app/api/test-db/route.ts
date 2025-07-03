import { NextResponse } from "next/server"
import { testConnection } from "../../../lib/mongodb"

export async function GET() {
  try {
    const isConnected = await testConnection()
    
    if (isConnected) {
      return NextResponse.json({ 
        success: true, 
        message: "Database connection successful" 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Database connection failed" 
      }, { status: 503 })
    }
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Database connection error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 503 })
  }
}