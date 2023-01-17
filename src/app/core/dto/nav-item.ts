export class NavItemDto {
  displayName: string;
  icon: string;
  route: string;
  role: string;
  children!: NavItemDto[];

  constructor(
    displayName: string,
    icon: string,
    role: string,
    route: string,
    children?: NavItemDto[]
  ) {
    this.displayName = displayName;
    this.icon = icon;
    this.role = role;
    this.route = route;
    this.children = children ? children : [];
  }
}
