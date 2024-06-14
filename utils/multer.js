import multer from "multer"
import path from 'path'


const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, 'uploads/' )
    },
    filename: function ( req, file, cb ) {
        const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 159 )
        cb( null, file.fieldname + '-' + uniqueSuffix )
    }
} )


export const uploads = multer( {
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function ( req, file, cb ) {
        checkFileType( file, cb );
    }
} )


function checkFileType( file, cb ) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    // Check extension
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );
    // Check mime type
    const mimetype = filetypes.test( file.mimetype );

    if ( mimetype && extname ) {
        return cb( null, true );
    } else {
        cb( 'Error: Images and PDFs only!' );
    }
}

export default multer