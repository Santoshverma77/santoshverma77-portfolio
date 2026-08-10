CREATE TABLE public.assistant_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT,
  answer TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.assistant_feedback TO anon, authenticated;
GRANT ALL ON public.assistant_feedback TO service_role;
ALTER TABLE public.assistant_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit assistant feedback" ON public.assistant_feedback FOR INSERT TO anon, authenticated WITH CHECK (char_length(answer) <= 8000 AND (question IS NULL OR char_length(question) <= 2000));