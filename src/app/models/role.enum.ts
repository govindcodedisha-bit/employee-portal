export enum Role {
  SystemAdmin = 'SystemAdmin',
  HRAdmin = 'HRAdmin',
  HR = 'HR',
  Employee = 'Employee'
}

export function toRole(role: string | null): Role | null {
  if (!role) return null;

  // normalize (important)
  const normalized = role.trim();

  if (Object.values(Role).includes(normalized as Role)) {
    return normalized as Role;
  }

  return null; // invalid role
}