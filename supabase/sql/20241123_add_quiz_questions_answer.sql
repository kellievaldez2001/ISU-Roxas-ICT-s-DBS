-- Run this script in the Supabase SQL editor or via the Supabase CLI to ensure the
-- quiz_questions table matches the application code.

ALTER TABLE IF EXISTS public.quiz_questions
  ADD COLUMN IF NOT EXISTS answer text,
  ADD COLUMN IF NOT EXISTS explanation text,
  ADD COLUMN IF NOT EXISTS sort_order integer,
  ADD COLUMN IF NOT EXISTS intro text;

-- Optional: update existing rows where answer is still null.
-- UPDATE public.quiz_questions SET answer = '' WHERE answer IS NULL;
