import { Request, Response } from 'express';

export const getCryptosController = (req: Request, res: Response) => {
  res.send('getCryptosController');
};

export const getCryptoByIdController = (req: Request, res: Response) => {
  res.send('getCryptoByIdController');
};

export const getCryptoPriceHistoryController = (
  req: Request,
  res: Response
) => {
  res.send('getCryptoPriceHistoryController');
};

export const postCryptoController = (req: Request, res: Response) => {
  res.send('postCryptoController');
};

export const deleteCryptoController = (req: Request, res: Response) => {
  res.send('deleteCryptoController');
};
