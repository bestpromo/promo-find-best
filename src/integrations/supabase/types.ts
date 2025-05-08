export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      partner_marketplace: {
        Row: {
          amazon_access_key: string | null
          amazon_partner_tag: string | null
          amazon_secret_key: string | null
          awin_publisher_id: string | null
          created_at: string
          id: number
          logo: string | null
          nome: string | null
          shopee_appid: string | null
          shopee_senha_api: string | null
        }
        Insert: {
          amazon_access_key?: string | null
          amazon_partner_tag?: string | null
          amazon_secret_key?: string | null
          awin_publisher_id?: string | null
          created_at?: string
          id?: number
          logo?: string | null
          nome?: string | null
          shopee_appid?: string | null
          shopee_senha_api?: string | null
        }
        Update: {
          amazon_access_key?: string | null
          amazon_partner_tag?: string | null
          amazon_secret_key?: string | null
          awin_publisher_id?: string | null
          created_at?: string
          id?: number
          logo?: string | null
          nome?: string | null
          shopee_appid?: string | null
          shopee_senha_api?: string | null
        }
        Relationships: []
      }
      stores: {
        Row: {
          created_at: string
          id: number
          id_partner_marketplace: number
          id_store_in_marketplace: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_partner_marketplace: number
          id_store_in_marketplace: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          id_partner_marketplace?: number
          id_store_in_marketplace?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_id_partner_marketplace_fkey"
            columns: ["id_partner_marketplace"]
            isOneToOne: false
            referencedRelation: "partner_marketplace"
            referencedColumns: ["id"]
          },
        ]
      }
      stores_products: {
        Row: {
          barcode: number | null
          created_at: string
          description: string | null
          ean: string | null
          gtin: string | null
          id: number
          id_store: number
          merchant_product_id: string
          name_product: string
          sku: string
          status: boolean
          stock: number | null
          thumbnail: string
          url: string | null
          url_tracked: string
        }
        Insert: {
          barcode?: number | null
          created_at?: string
          description?: string | null
          ean?: string | null
          gtin?: string | null
          id?: number
          id_store: number
          merchant_product_id: string
          name_product: string
          sku: string
          status: boolean
          stock?: number | null
          thumbnail: string
          url?: string | null
          url_tracked: string
        }
        Update: {
          barcode?: number | null
          created_at?: string
          description?: string | null
          ean?: string | null
          gtin?: string | null
          id?: number
          id_store?: number
          merchant_product_id?: string
          name_product?: string
          sku?: string
          status?: boolean
          stock?: number | null
          thumbnail?: string
          url?: string | null
          url_tracked?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_products_id_store_fkey"
            columns: ["id_store"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores_products_media: {
        Row: {
          created_at: string
          id: number
          id_product: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_product: number
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          id_product?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_products_media_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_products_media_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "stores_products"
            referencedColumns: ["id"]
          },
        ]
      }
      stores_products_price: {
        Row: {
          base_price: number | null
          created_at: string
          id: number
          id_product: number
          original_price: number | null
          price: number
        }
        Insert: {
          base_price?: number | null
          created_at?: string
          id?: number
          id_product: number
          original_price?: number | null
          price: number
        }
        Update: {
          base_price?: number | null
          created_at?: string
          id?: number
          id_product?: number
          original_price?: number | null
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "stores_products_price_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_products_price_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "stores_products"
            referencedColumns: ["id"]
          },
        ]
      }
      temp_import_catalog_awin: {
        Row: {
          alternate_image: string | null
          alternate_image_four: string | null
          alternate_image_three: string | null
          alternate_image_two: string | null
          average_rating: string | null
          aw_deep_link: string | null
          aw_image_url: string | null
          aw_product_id: string | null
          aw_thumb_url: string | null
          base_price: string | null
          base_price_amount: string | null
          base_price_text: string | null
          basket_link: string | null
          brand_id: string | null
          brand_name: string | null
          category_id: string | null
          category_name: string | null
          colour: string | null
          commission_group: string | null
          condition: string | null
          currency: string | null
          custom_1: string | null
          custom_2: string | null
          custom_3: string | null
          custom_4: string | null
          custom_5: string | null
          custom_6: string | null
          custom_7: string | null
          custom_8: string | null
          custom_9: string | null
          data_feed_id: string | null
          delivery_cost: string | null
          delivery_restrictions: string | null
          delivery_time: string | null
          delivery_weight: string | null
          description: string | null
          dimensions: string | null
          display_price: string | null
          ean: string | null
          fashion_category: string | null
          fashion_material: string | null
          fashion_pattern: string | null
          fashion_size: string | null
          fashion_suitable_for: string | null
          fashion_swatch: string | null
          id: number
          in_stock: string | null
          is_for_sale: string | null
          isbn: string | null
          keywords: string | null
          language: string | null
          large_image: string | null
          last_updated: string | null
          merchant_category: string | null
          merchant_deep_link: string | null
          merchant_id: string | null
          merchant_image_url: string | null
          merchant_name: string | null
          merchant_product_category_path: string | null
          merchant_product_id: string | null
          merchant_product_second_category: string | null
          merchant_product_third_category: string | null
          merchant_thumb_url: string | null
          model_number: string | null
          mpn: string | null
          number_available: string | null
          parent_product_id: string | null
          pre_order: string | null
          product_gtin: string | null
          product_model: string | null
          product_name: string | null
          product_price_old: string | null
          product_short_description: string | null
          product_type: string | null
          promotional_text: string | null
          rating: string | null
          reviews: string | null
          rrp_price: string | null
          saving: string | null
          savings_percent: string | null
          search_price: string | null
          size_stock_amount: string | null
          size_stock_status: string | null
          specifications: string | null
          stock_quantity: string | null
          stock_status: string | null
          store_price: string | null
          terms_of_contract: string | null
          upc: string | null
          valid_from: string | null
          valid_to: string | null
          warranty: string | null
          web_offer: string | null
        }
        Insert: {
          alternate_image?: string | null
          alternate_image_four?: string | null
          alternate_image_three?: string | null
          alternate_image_two?: string | null
          average_rating?: string | null
          aw_deep_link?: string | null
          aw_image_url?: string | null
          aw_product_id?: string | null
          aw_thumb_url?: string | null
          base_price?: string | null
          base_price_amount?: string | null
          base_price_text?: string | null
          basket_link?: string | null
          brand_id?: string | null
          brand_name?: string | null
          category_id?: string | null
          category_name?: string | null
          colour?: string | null
          commission_group?: string | null
          condition?: string | null
          currency?: string | null
          custom_1?: string | null
          custom_2?: string | null
          custom_3?: string | null
          custom_4?: string | null
          custom_5?: string | null
          custom_6?: string | null
          custom_7?: string | null
          custom_8?: string | null
          custom_9?: string | null
          data_feed_id?: string | null
          delivery_cost?: string | null
          delivery_restrictions?: string | null
          delivery_time?: string | null
          delivery_weight?: string | null
          description?: string | null
          dimensions?: string | null
          display_price?: string | null
          ean?: string | null
          fashion_category?: string | null
          fashion_material?: string | null
          fashion_pattern?: string | null
          fashion_size?: string | null
          fashion_suitable_for?: string | null
          fashion_swatch?: string | null
          id?: number
          in_stock?: string | null
          is_for_sale?: string | null
          isbn?: string | null
          keywords?: string | null
          language?: string | null
          large_image?: string | null
          last_updated?: string | null
          merchant_category?: string | null
          merchant_deep_link?: string | null
          merchant_id?: string | null
          merchant_image_url?: string | null
          merchant_name?: string | null
          merchant_product_category_path?: string | null
          merchant_product_id?: string | null
          merchant_product_second_category?: string | null
          merchant_product_third_category?: string | null
          merchant_thumb_url?: string | null
          model_number?: string | null
          mpn?: string | null
          number_available?: string | null
          parent_product_id?: string | null
          pre_order?: string | null
          product_gtin?: string | null
          product_model?: string | null
          product_name?: string | null
          product_price_old?: string | null
          product_short_description?: string | null
          product_type?: string | null
          promotional_text?: string | null
          rating?: string | null
          reviews?: string | null
          rrp_price?: string | null
          saving?: string | null
          savings_percent?: string | null
          search_price?: string | null
          size_stock_amount?: string | null
          size_stock_status?: string | null
          specifications?: string | null
          stock_quantity?: string | null
          stock_status?: string | null
          store_price?: string | null
          terms_of_contract?: string | null
          upc?: string | null
          valid_from?: string | null
          valid_to?: string | null
          warranty?: string | null
          web_offer?: string | null
        }
        Update: {
          alternate_image?: string | null
          alternate_image_four?: string | null
          alternate_image_three?: string | null
          alternate_image_two?: string | null
          average_rating?: string | null
          aw_deep_link?: string | null
          aw_image_url?: string | null
          aw_product_id?: string | null
          aw_thumb_url?: string | null
          base_price?: string | null
          base_price_amount?: string | null
          base_price_text?: string | null
          basket_link?: string | null
          brand_id?: string | null
          brand_name?: string | null
          category_id?: string | null
          category_name?: string | null
          colour?: string | null
          commission_group?: string | null
          condition?: string | null
          currency?: string | null
          custom_1?: string | null
          custom_2?: string | null
          custom_3?: string | null
          custom_4?: string | null
          custom_5?: string | null
          custom_6?: string | null
          custom_7?: string | null
          custom_8?: string | null
          custom_9?: string | null
          data_feed_id?: string | null
          delivery_cost?: string | null
          delivery_restrictions?: string | null
          delivery_time?: string | null
          delivery_weight?: string | null
          description?: string | null
          dimensions?: string | null
          display_price?: string | null
          ean?: string | null
          fashion_category?: string | null
          fashion_material?: string | null
          fashion_pattern?: string | null
          fashion_size?: string | null
          fashion_suitable_for?: string | null
          fashion_swatch?: string | null
          id?: number
          in_stock?: string | null
          is_for_sale?: string | null
          isbn?: string | null
          keywords?: string | null
          language?: string | null
          large_image?: string | null
          last_updated?: string | null
          merchant_category?: string | null
          merchant_deep_link?: string | null
          merchant_id?: string | null
          merchant_image_url?: string | null
          merchant_name?: string | null
          merchant_product_category_path?: string | null
          merchant_product_id?: string | null
          merchant_product_second_category?: string | null
          merchant_product_third_category?: string | null
          merchant_thumb_url?: string | null
          model_number?: string | null
          mpn?: string | null
          number_available?: string | null
          parent_product_id?: string | null
          pre_order?: string | null
          product_gtin?: string | null
          product_model?: string | null
          product_name?: string | null
          product_price_old?: string | null
          product_short_description?: string | null
          product_type?: string | null
          promotional_text?: string | null
          rating?: string | null
          reviews?: string | null
          rrp_price?: string | null
          saving?: string | null
          savings_percent?: string | null
          search_price?: string | null
          size_stock_amount?: string | null
          size_stock_status?: string | null
          specifications?: string | null
          stock_quantity?: string | null
          stock_status?: string | null
          store_price?: string | null
          terms_of_contract?: string | null
          upc?: string | null
          valid_from?: string | null
          valid_to?: string | null
          warranty?: string | null
          web_offer?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      products: {
        Row: {
          description: string | null
          id: number | null
          loja_nome: string | null
          nome: string | null
          photo: string | null
          price: number | null
          url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
