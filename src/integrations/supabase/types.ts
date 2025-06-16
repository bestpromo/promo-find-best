export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: { p_usename: string }
        Returns: {
          username: string
          password: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      awin_catalog_import_temp: {
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
          created_at: string | null
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
          imported: boolean | null
          in_stock: boolean | null
          is_for_sale: boolean | null
          isbn: string | null
          keywords: string | null
          language: string | null
          large_image: string | null
          last_updated: string | null
          merchant_category: string | null
          merchant_deep_link: string | null
          merchant_id: number | null
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
          partner_id: number | null
          pre_order: boolean | null
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
          web_offer: boolean | null
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
          created_at?: string | null
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
          imported?: boolean | null
          in_stock?: boolean | null
          is_for_sale?: boolean | null
          isbn?: string | null
          keywords?: string | null
          language?: string | null
          large_image?: string | null
          last_updated?: string | null
          merchant_category?: string | null
          merchant_deep_link?: string | null
          merchant_id?: number | null
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
          partner_id?: number | null
          pre_order?: boolean | null
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
          web_offer?: boolean | null
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
          created_at?: string | null
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
          imported?: boolean | null
          in_stock?: boolean | null
          is_for_sale?: boolean | null
          isbn?: string | null
          keywords?: string | null
          language?: string | null
          large_image?: string | null
          last_updated?: string | null
          merchant_category?: string | null
          merchant_deep_link?: string | null
          merchant_id?: number | null
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
          partner_id?: number | null
          pre_order?: boolean | null
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
          web_offer?: boolean | null
        }
        Relationships: []
      }
      catalog_attribute_name: {
        Row: {
          attribute_id: string
          created_at: string | null
          display_name: string | null
          name: string
          used_in_filter: boolean | null
        }
        Insert: {
          attribute_id?: string
          created_at?: string | null
          display_name?: string | null
          name: string
          used_in_filter?: boolean | null
        }
        Update: {
          attribute_id?: string
          created_at?: string | null
          display_name?: string | null
          name?: string
          used_in_filter?: boolean | null
        }
        Relationships: []
      }
      catalog_attribute_value: {
        Row: {
          attribute_id: string
          display_value: string | null
          value: string
          value_id: string
        }
        Insert: {
          attribute_id: string
          display_value?: string | null
          value: string
          value_id?: string
        }
        Update: {
          attribute_id?: string
          display_value?: string | null
          value?: string
          value_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_attribute_value_attribute_id_fkey"
            columns: ["attribute_id"]
            referencedRelation: "catalog_attribute_name"
            referencedColumns: ["attribute_id"]
          },
        ]
      }
      catalog_brand: {
        Row: {
          brand_id: string
          created_at: string | null
          description: string | null
          logo: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          brand_id?: string
          created_at?: string | null
          description?: string | null
          logo?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string | null
          description?: string | null
          logo?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      catalog_category_offer: {
        Row: {
          category_id: string
          created_at: string | null
          display_order: number | null
          main_category: boolean | null
          offer_category_id: string
          offer_id: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          display_order?: number | null
          main_category?: boolean | null
          offer_category_id?: string
          offer_id: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          display_order?: number | null
          main_category?: boolean | null
          offer_category_id?: string
          offer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_category_offer_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category_categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "catalog_category_offer_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_category_offer_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_logistics_info: {
        Row: {
          barcode: string | null
          created_at: string | null
          depth: number | null
          fragile_offer: boolean | null
          free_shipping: boolean | null
          height: number | null
          logistics_id: string
          offer_id: string
          package_weight: number | null
          processing_time: number | null
          updated_at: string | null
          weight: number | null
          width: number | null
        }
        Insert: {
          barcode?: string | null
          created_at?: string | null
          depth?: number | null
          fragile_offer?: boolean | null
          free_shipping?: boolean | null
          height?: number | null
          logistics_id?: string
          offer_id: string
          package_weight?: number | null
          processing_time?: number | null
          updated_at?: string | null
          weight?: number | null
          width?: number | null
        }
        Update: {
          barcode?: string | null
          created_at?: string | null
          depth?: number | null
          fragile_offer?: boolean | null
          free_shipping?: boolean | null
          height?: number | null
          logistics_id?: string
          offer_id?: string
          package_weight?: number | null
          processing_time?: number | null
          updated_at?: string | null
          weight?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_logistics_info_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_logistics_info_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_offer: {
        Row: {
          adult: boolean | null
          brand_id: string | null
          condition: string | null
          country_of_origin: string | null
          created_at: string | null
          deep_link_url: string | null
          full_description: string | null
          merchant_id: number
          merchant_offer_id: string
          meta_description: string | null
          meta_title: string | null
          mpn: string | null
          offer_gtin: string | null
          offer_id: string
          partner_id: number
          short_description: string | null
          sku: string | null
          status: string | null
          store_id: string | null
          title: string
          updated_at: string | null
          url_slug: string | null
        }
        Insert: {
          adult?: boolean | null
          brand_id?: string | null
          condition?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          deep_link_url?: string | null
          full_description?: string | null
          merchant_id: number
          merchant_offer_id: string
          meta_description?: string | null
          meta_title?: string | null
          mpn?: string | null
          offer_gtin?: string | null
          offer_id?: string
          partner_id: number
          short_description?: string | null
          sku?: string | null
          status?: string | null
          store_id?: string | null
          title: string
          updated_at?: string | null
          url_slug?: string | null
        }
        Update: {
          adult?: boolean | null
          brand_id?: string | null
          condition?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          deep_link_url?: string | null
          full_description?: string | null
          merchant_id?: number
          merchant_offer_id?: string
          meta_description?: string | null
          meta_title?: string | null
          mpn?: string | null
          offer_gtin?: string | null
          offer_id?: string
          partner_id?: number
          short_description?: string | null
          sku?: string | null
          status?: string | null
          store_id?: string | null
          title?: string
          updated_at?: string | null
          url_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "catalog_brand"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "catalog_offer_partner_id_fkey"
            columns: ["partner_id"]
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_offer_attribute: {
        Row: {
          attribute_id: string
          created_at: string | null
          display_order: number | null
          offer_attribute_id: string
          offer_id: string
          updated_at: string | null
          value_id: string
        }
        Insert: {
          attribute_id: string
          created_at?: string | null
          display_order?: number | null
          offer_attribute_id?: string
          offer_id: string
          updated_at?: string | null
          value_id: string
        }
        Update: {
          attribute_id?: string
          created_at?: string | null
          display_order?: number | null
          offer_attribute_id?: string
          offer_id?: string
          updated_at?: string | null
          value_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_attribute_attribute_id_fkey"
            columns: ["attribute_id"]
            referencedRelation: "catalog_attribute_name"
            referencedColumns: ["attribute_id"]
          },
          {
            foreignKeyName: "catalog_offer_attribute_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_attribute_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_attribute_value_id_fkey"
            columns: ["value_id"]
            referencedRelation: "catalog_attribute_value"
            referencedColumns: ["value_id"]
          },
        ]
      }
      catalog_offer_click: {
        Row: {
          click_id: number
          clicked_at: string
          ip_address: unknown | null
          offer_id: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: number | null
        }
        Insert: {
          click_id?: number
          clicked_at?: string
          ip_address?: unknown | null
          offer_id: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: number | null
        }
        Update: {
          click_id?: number
          clicked_at?: string
          ip_address?: unknown | null
          offer_id?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_offer"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "fk_offer"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_offer_image: {
        Row: {
          alt_text: string | null
          created_at: string | null
          display_order: number | null
          image_id: string
          image_url: string
          main_image: boolean | null
          offer_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          display_order?: number | null
          image_id?: string
          image_url: string
          main_image?: boolean | null
          offer_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          display_order?: number | null
          image_id?: string
          image_url?: string
          main_image?: boolean | null
          offer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_image_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_image_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_offer_pricing: {
        Row: {
          created_at: string | null
          currency: string | null
          offer_cost: number | null
          offer_id: string
          original_price: number | null
          pricing_id: string
          profit_margin: number | null
          promotion_end: string | null
          promotion_start: string | null
          promotional_price: number | null
          sale_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          offer_cost?: number | null
          offer_id: string
          original_price?: number | null
          pricing_id?: string
          profit_margin?: number | null
          promotion_end?: string | null
          promotion_start?: string | null
          promotional_price?: number | null
          sale_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          offer_cost?: number | null
          offer_id?: string
          original_price?: number | null
          pricing_id?: string
          profit_margin?: number | null
          promotion_end?: string | null
          promotion_start?: string | null
          promotional_price?: number | null
          sale_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_pricing_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_pricing_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_offer_stock: {
        Row: {
          allow_backorder: boolean | null
          created_at: string | null
          minimum_stock: number | null
          offer_id: string
          quantity: number
          stock_id: string
          unit: string | null
          updated_at: string | null
          warehouse_location: string | null
        }
        Insert: {
          allow_backorder?: boolean | null
          created_at?: string | null
          minimum_stock?: number | null
          offer_id: string
          quantity?: number
          stock_id?: string
          unit?: string | null
          updated_at?: string | null
          warehouse_location?: string | null
        }
        Update: {
          allow_backorder?: boolean | null
          created_at?: string | null
          minimum_stock?: number | null
          offer_id?: string
          quantity?: number
          stock_id?: string
          unit?: string | null
          updated_at?: string | null
          warehouse_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_stock_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_stock_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      catalog_offer_variation: {
        Row: {
          attribute_id: string
          created_at: string | null
          offer_id: string
          specific_image: string | null
          specific_price: number | null
          specific_stock: number | null
          updated_at: string | null
          value_id: string
          variation_id: string
        }
        Insert: {
          attribute_id: string
          created_at?: string | null
          offer_id: string
          specific_image?: string | null
          specific_price?: number | null
          specific_stock?: number | null
          updated_at?: string | null
          value_id: string
          variation_id?: string
        }
        Update: {
          attribute_id?: string
          created_at?: string | null
          offer_id?: string
          specific_image?: string | null
          specific_price?: number | null
          specific_stock?: number | null
          updated_at?: string | null
          value_id?: string
          variation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_offer_variation_attribute_id_fkey"
            columns: ["attribute_id"]
            referencedRelation: "catalog_attribute_name"
            referencedColumns: ["attribute_id"]
          },
          {
            foreignKeyName: "catalog_offer_variation_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_variation_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_offer_variation_value_id_fkey"
            columns: ["value_id"]
            referencedRelation: "catalog_attribute_value"
            referencedColumns: ["value_id"]
          },
        ]
      }
      catalog_review: {
        Row: {
          approved: boolean | null
          comment: string | null
          customer_id: string
          offer_id: string
          rating: number
          review_date: string | null
          review_id: string
        }
        Insert: {
          approved?: boolean | null
          comment?: string | null
          customer_id: string
          offer_id: string
          rating: number
          review_date?: string | null
          review_id?: string
        }
        Update: {
          approved?: boolean | null
          comment?: string | null
          customer_id?: string
          offer_id?: string
          rating?: number
          review_date?: string | null
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_review_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "catalog_offer"
            referencedColumns: ["offer_id"]
          },
          {
            foreignKeyName: "catalog_review_offer_id_fkey"
            columns: ["offer_id"]
            referencedRelation: "offer_search"
            referencedColumns: ["offer_id"]
          },
        ]
      }
      category_categories: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          display_order: number | null
          full_path: string | null
          hierarchy_level: number
          icon: string | null
          main_image: string | null
          meli_category_id: string | null
          meli_category_parent_id: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          parent_category_id: string | null
          show_in_menu: boolean | null
          show_on_home: boolean | null
          status: string
          updated_at: string | null
          url_slug: string
        }
        Insert: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          full_path?: string | null
          hierarchy_level?: number
          icon?: string | null
          main_image?: string | null
          meli_category_id?: string | null
          meli_category_parent_id?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          parent_category_id?: string | null
          show_in_menu?: boolean | null
          show_on_home?: boolean | null
          status?: string
          updated_at?: string | null
          url_slug: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          full_path?: string | null
          hierarchy_level?: number
          icon?: string | null
          main_image?: string | null
          meli_category_id?: string | null
          meli_category_parent_id?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          parent_category_id?: string | null
          show_in_menu?: boolean | null
          show_on_home?: boolean | null
          status?: string
          updated_at?: string | null
          url_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            referencedRelation: "category_categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      import_offers_staging: {
        Row: {
          attributes: Json | null
          brand_name: string | null
          category_path: string | null
          category_path_secondary: string | null
          condition: string | null
          created_at: string | null
          deep_link_url: string | null
          ean: string | null
          error_process: boolean | null
          gtin: string | null
          images: Json | null
          import_batch_id: string | null
          is_adult: boolean | null
          isbn: string | null
          logistics: Json | null
          merchant_category: string | null
          merchant_category_name: string | null
          merchant_deep_link_url: string | null
          merchant_id: number | null
          merchant_name: string | null
          mpn: string | null
          offer_full_description: string | null
          offer_merchant_id: string | null
          offer_short_description: string | null
          offer_title: string | null
          partner_id: number | null
          partner_name: string | null
          prices: Json | null
          processed: boolean | null
          processed_at: string | null
          product_type: string | null
          raw_data: Json | null
          reason_error: string | null
          sku: string | null
          staging_id: number
          status: boolean | null
          stock_qty: number | null
          upc: string | null
        }
        Insert: {
          attributes?: Json | null
          brand_name?: string | null
          category_path?: string | null
          category_path_secondary?: string | null
          condition?: string | null
          created_at?: string | null
          deep_link_url?: string | null
          ean?: string | null
          error_process?: boolean | null
          gtin?: string | null
          images?: Json | null
          import_batch_id?: string | null
          is_adult?: boolean | null
          isbn?: string | null
          logistics?: Json | null
          merchant_category?: string | null
          merchant_category_name?: string | null
          merchant_deep_link_url?: string | null
          merchant_id?: number | null
          merchant_name?: string | null
          mpn?: string | null
          offer_full_description?: string | null
          offer_merchant_id?: string | null
          offer_short_description?: string | null
          offer_title?: string | null
          partner_id?: number | null
          partner_name?: string | null
          prices?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          product_type?: string | null
          raw_data?: Json | null
          reason_error?: string | null
          sku?: string | null
          staging_id?: number
          status?: boolean | null
          stock_qty?: number | null
          upc?: string | null
        }
        Update: {
          attributes?: Json | null
          brand_name?: string | null
          category_path?: string | null
          category_path_secondary?: string | null
          condition?: string | null
          created_at?: string | null
          deep_link_url?: string | null
          ean?: string | null
          error_process?: boolean | null
          gtin?: string | null
          images?: Json | null
          import_batch_id?: string | null
          is_adult?: boolean | null
          isbn?: string | null
          logistics?: Json | null
          merchant_category?: string | null
          merchant_category_name?: string | null
          merchant_deep_link_url?: string | null
          merchant_id?: number | null
          merchant_name?: string | null
          mpn?: string | null
          offer_full_description?: string | null
          offer_merchant_id?: string | null
          offer_short_description?: string | null
          offer_title?: string | null
          partner_id?: number | null
          partner_name?: string | null
          prices?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          product_type?: string | null
          raw_data?: Json | null
          reason_error?: string | null
          sku?: string | null
          staging_id?: number
          status?: boolean | null
          stock_qty?: number | null
          upc?: string | null
        }
        Relationships: []
      }
      partners: {
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
          name: string
          partner_id: number
          partner_merchant_id: number
          store_id: string
        }
        Insert: {
          name: string
          partner_id: number
          partner_merchant_id: number
          store_id?: string
        }
        Update: {
          name?: string
          partner_id?: number
          partner_merchant_id?: number
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_partners"
            columns: ["partner_id"]
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      offer_search: {
        Row: {
          brand_name: string | null
          deep_link_url: string | null
          image_url: string | null
          merchant_id: number | null
          offer_id: string | null
          partner_name: string | null
          promotional_price: number | null
          sale_price: number | null
          short_description: string | null
          sku: string | null
          store_name: string | null
          title: string | null
          url_slug: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; name: string; owner: string; metadata: Json }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_level: {
        Args: { name: string }
        Returns: number
      }
      get_prefix: {
        Args: { name: string }
        Returns: string
      }
      get_prefixes: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_legacy_v1: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v1_optimised: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v2: {
        Args: {
          prefix: string
          bucket_name: string
          limits?: number
          levels?: number
          start_after?: string
        }
        Returns: {
          key: string
          name: string
          id: string
          updated_at: string
          created_at: string
          metadata: Json
        }[]
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
  graphql_public: {
    Enums: {},
  },
  pgbouncer: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
  storage: {
    Enums: {},
  },
} as const
