import { Response } from 'express';

export function Failure(res: Response, error: any, message: string) {

  if (error.isJoi) {
    const errorMessage = error.details[0].message;

    return res.status(422).json({ body: errorMessage, message });

  } else {

    return res.status(error.status || 500).json({ body: error.message, message });

  }

}

export function Success(res: Response, body: any, message: string) {

  return res.status(200).json({ body, message });

}
