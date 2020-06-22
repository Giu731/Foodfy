CREATE DATABASE foodfy;

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "created_at" timestamp,
  "file_id" int 
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "path" TEXT NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "title" TEXT NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "user_id" int
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"reset_token" TEXT,
	"reset_token_expires" TEXT,
	"is_admin" BOOLEAN DEFAULT false,
	"created_at" TIMESTAMP DEFAULT(now()),
	"updated_at" TIMESTAMP DEFAULT(now())
);

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

--Trigger
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp(); 

-- table session
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- CASCADE EFFECT WHEN DELETE USER AND RECIPE
ALTER TABLE "recipes"
DROP CONSTRAINT recipes_user_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users"("id")
ON DELETE CASCADE;

ALTER TABLE "recipe_files"
DROP CONSTRAINT recipe_files_recipe_id_fkey,
ADD CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "recipes"("id")
ON DELETE CASCADE;

ALTER TABLE "recipe_files"
DROP CONSTRAINT recipe_files_file_id_fkey,
ADD CONSTRAINT recipe_files_file_id_fkey
FOREIGN KEY ("file_id")
REFERENCES "files"("id")
ON DELETE CASCADE;