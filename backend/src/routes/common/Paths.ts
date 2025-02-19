
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  PackageDetails:{
    Base: '/package-details',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  CollectionPoints:{
    Base: '/collection-points',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  PickupCharge:{
    Base: '/pickup-charges',
    Get: '/all',
    Import: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  }
} as const;
