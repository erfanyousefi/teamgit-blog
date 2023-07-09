import { Request } from "express";
import { extname, join } from "path";
import { MulterFile } from "../types/public";
import { DestinationCallback, FileNameCallback } from "../types/multer.type";
import { mkdirSync } from "fs";

export function multerDestination() {
    return (req: Request, file: MulterFile, callback: DestinationCallback): void => {
        let path = join("public", "upload", "image");
        mkdirSync(path, { recursive: true });
        callback(null, path);
    }
}

export function multerFileName(req: Request, file: MulterFile, callback: FileNameCallback): void {
    const ext = extname(file.originalname);
    const newName = `${Date.now()}${ext}`;
    callback(null, newName);
}