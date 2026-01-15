-- Create products table for perfumes
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL DEFAULT 'unisex',
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '{"top": [], "heart": [], "base": []}'::jsonb,
  stock INTEGER NOT NULL DEFAULT 100,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are publicly viewable" 
ON public.products 
FOR SELECT 
USING (true);

-- Reviews are publicly readable
CREATE POLICY "Reviews are publicly viewable" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Anyone can add reviews (for demo purposes)
CREATE POLICY "Anyone can add reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, short_description, price, category, sizes, images, notes, featured) VALUES
(
  'Noir Mystique',
  'A captivating blend of dark rose and smoky oud that evokes midnight gardens. This opulent fragrance opens with bergamot and black pepper, warming into a heart of Bulgarian rose and saffron, before settling into a base of rich oud, amber, and vanilla. Perfect for evening occasions and those who appreciate sophisticated, mysterious scents.',
  'Dark rose and smoky oud for mysterious allure',
  289.00,
  'unisex',
  '["30ml", "50ml", "100ml"]'::jsonb,
  '["https://images.unsplash.com/photo-1541643600914-78b084683601?w=800", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800", "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800"]'::jsonb,
  '{"top": ["Bergamot", "Black Pepper"], "heart": ["Bulgarian Rose", "Saffron"], "base": ["Oud", "Amber", "Vanilla"]}'::jsonb,
  true
),
(
  'Golden Amber',
  'Luxurious warmth captured in a bottle. Golden Amber is a rich, enveloping fragrance that wraps you in comfort. The scent journey begins with honey and orange blossom, transitions through jasmine and iris, and culminates in a warm embrace of amber, sandalwood, and musk. An elegant choice for any season.',
  'Warm honey and amber for timeless elegance',
  245.00,
  'feminine',
  '["30ml", "50ml", "100ml"]'::jsonb,
  '["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800", "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800", "https://images.unsplash.com/photo-1590156206657-aec6c3aa5f02?w=800"]'::jsonb,
  '{"top": ["Honey", "Orange Blossom"], "heart": ["Jasmine", "Iris"], "base": ["Amber", "Sandalwood", "Musk"]}'::jsonb,
  true
),
(
  'Ocean Breeze',
  'Fresh and invigorating like a walk along the Mediterranean coast. This aquatic masterpiece combines sea salt and citrus with aromatic herbs and driftwood. The opening bursts with bergamot and sea notes, the heart reveals rosemary and lavender, while the base anchors with cedar and white musk. Ideal for daily wear.',
  'Fresh marine notes with citrus zest',
  175.00,
  'masculine',
  '["50ml", "100ml"]'::jsonb,
  '["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800", "https://images.unsplash.com/photo-1544923246-f1b3e8c3e586?w=800", "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800"]'::jsonb,
  '{"top": ["Bergamot", "Sea Salt", "Lemon"], "heart": ["Rosemary", "Lavender"], "base": ["Cedarwood", "White Musk"]}'::jsonb,
  true
),
(
  'Velvet Rose',
  'A romantic ode to the queen of flowers. Velvet Rose is an opulent floral that celebrates the rose in all its glory. Pink pepper and raspberry open this symphony, leading to a lush bouquet of Damascena rose, peony, and magnolia. The dry down reveals patchouli and white musk for lasting sensuality.',
  'Romantic rose bouquet with velvety depth',
  320.00,
  'feminine',
  '["30ml", "50ml", "100ml"]'::jsonb,
  '["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800"]'::jsonb,
  '{"top": ["Pink Pepper", "Raspberry"], "heart": ["Damascena Rose", "Peony", "Magnolia"], "base": ["Patchouli", "White Musk"]}'::jsonb,
  true
),
(
  'Midnight Leather',
  'Bold and unapologetic. Midnight Leather is for those who command attention. This daring composition opens with whiskey and cardamom, develops into tobacco flower and leather, and settles into a powerful base of vetiver, oud, and benzoin. A statement fragrance for confident individuals.',
  'Bold leather and whiskey for the daring',
  365.00,
  'masculine',
  '["50ml", "100ml"]'::jsonb,
  '["https://images.unsplash.com/photo-1547887538-047f814bfb64?w=800", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800", "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800"]'::jsonb,
  '{"top": ["Whiskey", "Cardamom"], "heart": ["Tobacco Flower", "Leather"], "base": ["Vetiver", "Oud", "Benzoin"]}'::jsonb,
  true
);

-- Insert sample reviews
INSERT INTO public.reviews (product_id, author_name, rating, comment) 
SELECT 
  p.id,
  'Sophie M.',
  5,
  'Absolutely stunning fragrance! The longevity is incredible and I receive compliments everywhere I go.'
FROM public.products p WHERE p.name = 'Noir Mystique';

INSERT INTO public.reviews (product_id, author_name, rating, comment) 
SELECT 
  p.id,
  'James R.',
  4,
  'Rich and sophisticated. Perfect for evening events. The oud note is beautifully balanced.'
FROM public.products p WHERE p.name = 'Noir Mystique';

INSERT INTO public.reviews (product_id, author_name, rating, comment) 
SELECT 
  p.id,
  'Elena K.',
  5,
  'This has become my signature scent. The amber note is so warm and inviting.'
FROM public.products p WHERE p.name = 'Golden Amber';

INSERT INTO public.reviews (product_id, author_name, rating, comment) 
SELECT 
  p.id,
  'Michael T.',
  5,
  'Fresh and clean without being overpowering. My go-to daily fragrance.'
FROM public.products p WHERE p.name = 'Ocean Breeze';

INSERT INTO public.reviews (product_id, author_name, rating, comment) 
SELECT 
  p.id,
  'Victoria L.',
  5,
  'The most beautiful rose fragrance I have ever worn. Truly luxurious.'
FROM public.products p WHERE p.name = 'Velvet Rose';