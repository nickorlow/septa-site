export type Trip  = {
  trip_id: string,
  entry_time: Date,
  entry_stop: string,
  entry_route: string, 
  entry_zone: string,
  entry_source: string,
  exit_time: Date,
  exit_stop: string,
  exit_route: string,
  exit_zone: string,
  exit_source: string,
  mode: string,
  amount: number,
  balance: number,
  trip_type: string,
  trip_status: string,
  trip_reversed: string,
  trip_product: string,
  dispute_status: string
}

export type TripResponse = {
  total: number, 
  start_index: number,
  end_index: number,
  result: Trip[]
} 

export type Key = {
  fare_media_id: string,
  account_id: string,
  fare_media_type: string,
  card_number: string,
  is_hotlisted: string,
  lost_stolen_date?: Date | null,
  balance_protection_date: Date,
  status: string,
  operating_status: string,
  expiration_date: Date,
  is_card_expiring: string,
  multi_rider_status: string,
  is_multi_rider_available: string,
  partner_program_info: PartnerProgramInfo,
  parking_registration_info?: (null)[] | null,
  balances: Balances,
  products?: (Product)[] | null
}

export type PartnerProgramInfo = {
  partner_program_status: string,
  eligible_to_register: string,
  eligible_to_update: string,
  eligible_to_suspend_resume: string
}

export type Balances = {
  travel_wallet_balance: number,
  stored_value_balance: number,
  transit_benefit_balance: number,
  parking_benefit_balance: number,
  paygo_balance: number,
  prepaid_debit_balance: number
}

export type Product = {
  product_id: string,
  mpd_id: string,
  product_name: string,
  product_type: string,
  pass_frequency: string,
  product_price: number,
  product_category: string,
  zone: string,
  purchase_date: Date,
  trip_used: number,
  trip_left: number,
  is_autoload_available: string,
  is_autoload_enabled: string,
  is_for_purchase: string,
  autoload_threshold: number,
  autoload_threshold_mr: number,
  autoload_amount: number
}

export type User = {
  id: string,
  firstname: string, 
  lastname: string,
  token: string
}

export type UserData = {
  user: User,
  trips: Trip[],
  keys: Key[]
}

export type UserDataResponse = {
  error?: Error | null,
  response: UserData
}

export interface JWTData {
  sub: string;
  firstname: string;
  contact_type: string;
  tmp: string;
  roles?: (string)[] | null;
  iss: string;
  exp: number;
  contact_id: string;
  iat: number;
  jti: string;
  lastname: string;
}

export type Error = {
  code: number,
  reason: string
}
