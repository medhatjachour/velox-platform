import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/admin-guard";

// PATCH /api/admin/users/[id] - Update user (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id: userId } = params;
    const body = await request.json();
    const { role, subscriptionTier, isActive, emailVerified } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role !== undefined && { role }),
        ...(subscriptionTier !== undefined && { subscriptionTier }),
        ...(isActive !== undefined && { isActive }),
        ...(emailVerified !== undefined && { emailVerified })
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        subscriptionTier: true,
        emailVerified: true,
        isActive: true
      }
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: unknown) {
    console.error("Update user error:", error);
    
    const err = error as Error;
    if (err.message === "Unauthorized" || err.message.startsWith("Forbidden")) {
      return NextResponse.json(
        { error: err.message },
        { status: err.message === "Unauthorized" ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id: userId } = params;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deleting super admins
    if (user.role === 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: "Cannot delete super admin users" },
        { status: 403 }
      );
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete user error:", error);
    
    const err = error as Error;
    if (err.message === "Unauthorized" || err.message.startsWith("Forbidden")) {
      return NextResponse.json(
        { error: err.message },
        { status: err.message === "Unauthorized" ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
